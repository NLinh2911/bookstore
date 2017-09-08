const Nightmare = require('nightmare');
const nightmare = Nightmare({show:true});
const imageDownloader = require('image-downloader');
const shell = require('shelljs');
const async = require('async');
const fs = require('fs');

// Mảng có mỗi phần tử là 1 object chứa thông tin một sản phẩm
let realdata = [];

nightmare.goto('http://www.allitebooks.com/')
.evaluate( function () {
  let header = document.querySelectorAll('.entry-title a');
  let bookUrls = [];
  header.forEach(function(element) {
    bookUrls.push(element.getAttribute('href'));
  });
  return bookUrls;
})
.end()
.then( function(bookUrls) {
  // let destPath = __dirname + '/books-images';
  // shell.mkdir('-p', destPath);
  console.log(bookUrls);
  console.log('So luong bai viet',bookUrls.length);
  crawl(bookUrls, (err,res) => {
    if(err) {
      console.log(err.message);
    }
    console.log('Hoàn thành chạy crawl()');
  })
})
  .catch(error => {
    console.log('Search failed: ', err.message);
  })

  // Hàm cào dữ liệu các subcategories con crawl()

  function crawl(bookUrls,cb) {
      function crawlEachUrl(item,cb) {
        let night = new Nightmare();
        night.goto(item)
        .wait(1000)
        .evaluate( () => {
          try {
            let title = document.querySelector('.single-title').innerText.trim();
            let bookDetail = document.querySelectorAll('dd')
            let author = bookDetail[0].innerText;
            let ISBN = bookDetail[1].innerText;
            let year = bookDetail[2].innerText;
            let pages = bookDetail[3].innerText;
            let language = bookDetail[4].innerText;
            let fileSize = bookDetail[5].innerText;
            let fileFormat = bookDetail[6].innerText;
            let category = bookDetail[7].innerText;
            let description = document.querySelector('.entry-content').innerHTML
            let link = document.querySelectorAll('.download-links a')
            let downloadLink = link[0].getAttribute('href')
            let readLink = link[1].getAttribute('href')
            let imgName = document.querySelector('.entry-body-thumbnail > a > img').getAttribute('src').slice(54).split('-').join(" ")
          //Push book-detail vào một object
          let obj = {
            title:title,
            author:author,
            ISBN:ISBN,
            year:year,
            pages:pages,
            language:language,
            fileSize:fileSize,
            fileFormat:fileFormat,
            category:category,
            description:description,
            downloadLink:downloadLink,
            readLink:readLink,
            imgName:imgName
          };
            return obj;
          }
          catch (error) {
            console.log(error);
          }
        })
        .end()
        .then( res => {
            if(!res) {
              cb(null,{})
            }
            try {
              realdata.push(res);
              exportJson(realdata, 'book_data.json');
              cb(null, res);
            }
            catch (error) {
              console.log(error.message);
              cb(null, {})
            }
        })
      }
          // dùng module async để giới hạn số tiến trình nightmare chạy 1 lúc
      async
      .mapLimit(bookUrls, 2, crawlEachUrl, function (err, res) {
        cb(null, res);
      });
  }

  function exportJson(bookUrls, filename) {
    // chuyển dữ liệu từ mảng arr sang json
    let json = {};
    let n = bookUrls.length;
    for (let i = 0; i < n; i++) {
      json[i] = bookUrls[i];
    }
    let jsonString = JSON.stringify(json,null,2);
    // lưu vào file json trong máy
    fs.writeFile(filename, jsonString, (err) => {
      if (err)
        throw err;
      console.log('Sách đã lưu vào file json ok!');
    });
  }
