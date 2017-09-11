

const Nightmare = require('nightmare');
const fs = require('fs');
const imageDownloader = require('image-downloader');
const shell = require('shelljs');
const async = require('async');

let nightmare = Nightmare();
// Mảng có mỗi phần tử là 1 object chứa thông tin một sản phẩm
let realdata = [];
//=========NIGHTMARE PROCESS ĐẦU TIÊN LẤY CÁC URL===================
nightmare
  .goto('http://www.allitebooks.com/web-development/')
  .wait(1000)
  .evaluate(function () {
    let links = document.querySelectorAll(".entry-title a");
    let arr = [];
    links.forEach(a => {
      arr.push(a.href);
    })
    return arr;
  })
  .end()
  .then(function (result) {
    console.log(result);
    // gọi hàm crawl() - tạo các nightmare process con để chạy vào từng url sản phẩm
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
function crawl(arr, cb) {
  let destPath = __dirname + '/images';
  shell.mkdir('-p', destPath);

  function crawlEachUrl(item, cb) {
    // item is each url
    let night = new Nightmare();
    night
      .goto(item)
      .wait(1000)
      .evaluate(function () {
        try {
          let obj = {};
          obj["title"] = document.querySelector('.entry-header h1').innerText.trim();
          // book detail
          let authorLinks = document.querySelector(".book-detail dd").querySelectorAll("a");
          let authors = []
          authorLinks.forEach(a => {
            authors.push(a.innerText.trim());
          })
          obj["author"] = authors;
          let categoryLinks = document.querySelector(".book-detail dd:last-child").querySelectorAll("a");
          let categories = []
          categoryLinks.forEach(a => {
            categories.push(a.innerText.trim());
          })
<<<<<<< HEAD
=======
<<<<<<< HEAD
          // obj["top_category"] = 'Web Development';
=======
          obj["top_category"] = 'Web Development';
>>>>>>> c2decbdb14ca8b399d0494ed5ad8a2e10484cff5
>>>>>>> 72e91d26caa48033537703804fbd81f54a0afdef
          obj["category"] = categories;
          let detailSelector = document.querySelectorAll(".book-detail dd");
          obj["isbn_10"] = detailSelector[1].innerText.trim();
          obj["year"] = parseInt(detailSelector[2].innerText.trim());
          obj["pages"] = parseInt(detailSelector[3].innerText.trim());
          obj["language"] = detailSelector[4].innerText.trim();
          obj["file_size"] = detailSelector[5].innerText.trim();
          obj["file_format"] = detailSelector[6].innerText.trim();
          obj["image"] = document.querySelector('.entry-body-thumbnail.hover-thumb img').src;
          obj["description"] = document.querySelector('.entry-content').innerHTML.trim();
          obj["download_link"] = document.querySelector('.download-links a').href;
          obj["read_link"] = document.querySelector('.download-links:nth-child(2) a').href;

          return obj;

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
          //update data every crawl time
          // chạy qua từng đg đẫn rồi tải về
          let options = {
            url: res.image,
            dest: `${destPath}/${res.title.split(' ').join('-')}.jpg`
          }
          imageDownloader.image(options).then(({
              filename,
              image
            }) => {
              // console.log('File saved ok: ', filename)
              res.image = filename.replace(`${destPath}/`, '');
              realdata.push(res);
              console.log(res);
<<<<<<< HEAD
              exportJson(realdata, 'product_data15.json');
=======
              exportJson(realdata, 'product_data1.json');
>>>>>>> 72e91d26caa48033537703804fbd81f54a0afdef
              cb(null, res);
            })
            .catch((err) => {
              throw err
            });
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
function exportJson(arr, filename) {
  let jsonString = JSON.stringify(arr, null, 2);
  // lưu vào file json trong máy
  fs.writeFile(filename, jsonString, (err) => {
    if (err)
      throw err;
    console.log('Sản phẩm lưu vào file json ok!');
  });
}