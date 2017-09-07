/**
 * Created by Linh Ngo in 12/07/2017
 */
//=========USING NIGHTMARE JS TO CRAWL MOBILE PHONE PRODUCT PAGE===============

const Nightmare = require('nightmare');
const async = require('async');
const imageDownloader = require('image-downloader');
const shell = require('shelljs');
const fs = require('fs');


let nightmare = Nightmare({
  show: true
});


// Mảng có mỗi phần tử là 1 object chứa thông tin một sản phẩm
let realdata = [];


//=========NIGHTMARE PROCESS ĐẦU TIÊN LẤY CÁC URL===================
nightmare
  .goto('http://www.allitebooks.com/web-development/')
  .wait(1000)
  .evaluate(function () {
    let res = document.querySelectorAll('.entry-title a')
    let arr = [];
    res.forEach(a => {
      arr.push(a.getAttribute('href'));
    })
    console.log(arr)
// chạy lấy thử 6 sản phẩm
//    let newarr = arr.slice(0, 6);
//    console.log(newarr)
    return arr
  })
  .end()
  .then(function (result) {
    console.log(result)
    // gọi hàm crawl() - tạo các nightmare process con để chạy
    // vào từng url sản phẩm
    crawl(result, function (err, res) {
      if (err) {
        console.log(err.message);
      }
      console.log('Hoàn thành chạy crawl()');
    });
  })
  .catch(function (err) {
    console.error('Search failed:', err.message);
  });

/**
 * Hàm cào dữ liệu chính nhận 1 mảng các url và tạo nightmare đọc dữ liệu của từng link
 * @param {array} arr - mảng chứa tất cả các url của sản phẩm
 * @param {function} cb - hàm callback khi hoàn thành 1 tiến trình nightmare đọc dữ liệu của 1 sản phẩm
 */
function crawl (arr, cb) {
  function crawlEachUrl (item, cb) {
    // item is each url
    let night = new Nightmare();
    night
      .goto(item)
      .wait(3000)
      .evaluate(function () {
        try {
          let obj = {}
          let title = document.querySelector('.entry-header h1').innerText.trim()
          //let mini_title = document.querySelector('.entry-header h4').innerText || ''
          let authorLinks = document.querySelector(".book-detail dd").querySelectorAll("a");
          let authors = []
          authorLinks.forEach(a => {
            authors.push(a.innerText.trim());
          })
          //let author = document.querySelectorAll('.book-detail dd')[0].innerText.trim()
          let isbn = document.querySelectorAll('.book-detail dd')[1].innerText.trim()
          let year = document.querySelectorAll('.book-detail dd')[2].innerText.trim()
          let pages = document.querySelectorAll('.book-detail dd')[3].innerText.trim()
          let lang = document.querySelectorAll('.book-detail dd')[4].innerText.trim()
          let size = document.querySelectorAll('.book-detail dd')[5].innerText.trim()
          let format = document.querySelectorAll('.book-detail dd')[6].innerText.trim()
          //let cate = document.querySelectorAll('.book-detail dd')[7].innerText
          let desc = document.querySelector('.entry-content').innerHTML
          let categoryLinks = document.querySelector(".book-detail dd:last-child").querySelectorAll("a");
          let cate = []
          categoryLinks.forEach(a => {
            cate.push(a.innerText.trim());
          })
          let top_cate = 'Web Development'
          let img_link = document.querySelector('.entry-body-thumbnail > a > img').getAttribute('src')

          /*let b = img_link.split('/')
          let n = b.length;
          let file = b[n-1]
          let img_name = file.split('.')[0]*/

          obj = {
            title,
            authors,
            isbn,
            year,
            pages,
            lang,
            size,
            format,
            cate,
            desc,
            img_link,
            top_cate
          }
          return obj
        } catch (err) {
          console.log(err.message);
          return {};
        }
      })
      .end()
      .then(function (res) {
        if (!res) {
          cb(null, {});
        }
        try {
          let destPath = __dirname + '/book-img'
          shell.mkdir('-p', destPath)

          let option = {
            url: res.img_link,
            dest: `${destPath}/${res.title}.jpg`
          }

          imageDownloader
            .image(option)
            .then(({filename, image}) => {
              console.log('File saved ok')
              res.img_link = filename.replace(`${destPath}/`, '');
            })

          //update data every crawl time
          realdata.push(res);

          exportJson(realdata, 'itbook.json');
          cb(null, res);
        } catch (err) {
          console.log(err.message);
          cb(null, {});
        }
      });
  }

  // dùng module async để giới hạn số tiến trình nightmare chạy 1 lúc
  async
    .mapLimit(arr, 2, crawlEachUrl, function (err, res) {
      cb(null, res);
    });
}

/**
 * Hàm nhận 1 mảng dữ liệu và lưu vào 1 file json
 * @param {array} arr - mảng dữ liệu ta muốn lưu
 * @param {string} filename - tên json file
 */
function exportJson (arr, filename) {
  // chuyển dữ liệu từ mảng arr sang json
  let json = {};
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    json[i] = arr[i];
  }
  let jsonString = JSON.stringify(json, null, 2);
  // lưu vào file json trong máy
  fs.writeFile(filename, jsonString, (err) => {
    if (err)
      throw err;
    console.log('Sách lưu vào file json ok!');
  });
}