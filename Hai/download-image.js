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
            let imgLink = document.querySelector('.entry-body-thumbnail > a > img').getAttribute('src');
          return imgLink
          }
          catch (error) {
            console.log(error);
          }
        })
        .end()
        .then( imgLink => {
            console.log(imgLink);
            let destPath = __dirname + '/books-images';
            let imgName = imgLink.slice(54)
            console.log(imgName);
            shell.mkdir('-p', destPath);

                let options = {
                  url: imgLink,
                  dest: `${destPath}/${imgName}`
                }
                imageDownloader
                  .image(options)
                  .then(({filename, image}) => {
                    console.log('File saved ok')
                  })
                  .catch((err) => {
                    throw err
                  });

            cb(null, imgLink);
        })
      }
    // dùng module async để giới hạn số tiến trình nightmare chạy 1 lúc
      async
      .mapLimit(bookUrls, 2, crawlEachUrl, function (err, res) {
        cb(null, res);
      });
  }

  // function exportJson(bookUrls, filename) {
  //   // chuyển dữ liệu từ mảng arr sang json
  //   let json = {};
  //   let n = bookUrls.length;
  //   for (let i = 0; i < n; i++) {
  //     json[i] = bookUrls[i];
  //   }
  //   let jsonString = JSON.stringify(json,null,2);
  //   // lưu vào file json trong máy
  //   fs.writeFile(filename, jsonString, (err) => {
  //     if (err)
  //       throw err;
  //     console.log('Sách đã lưu vào file json ok!');
  //   });
  // }
