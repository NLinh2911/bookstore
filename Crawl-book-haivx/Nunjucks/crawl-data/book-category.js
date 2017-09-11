/**
 * Created by Linh Ngo in 31/08/2017
 */
//=========CRAWL BOOK CATEGORIES===============

const Nightmare = require('nightmare');
const async = require('async');
let nightmare = Nightmare({
  show: true
});
const download = require('image-downloader');
const shell = require('shelljs');
const fs = require('fs');

// Mảng có mỗi phần tử là 1 object chứa thông tin một sản phẩm
let realdata = [];

//=========NIGHTMARE PROCESS ĐẦU TIÊN LẤY CÁC URL===================
nightmare
  .goto('http://www.allitebooks.com/')
  .wait(1000)
  .evaluate(function () {
    let links = document.querySelectorAll("#menu-item-65>ul>li>a");
    let topCat = [];
    links.forEach((a, index) => {
      let obj = {
        id: index + 1,
        name: a.innerText,
        parent_id: null
      }
      topCat.push(obj);
    })
    return topCat;
  })
  .end()
  .then(function (topCat) {
    exportJson(topCat, 'topcat.json')
  })
  .catch(function (err) {
    console.error('Search failed:', err.message);
  });



/**
 * Hàm nhận 1 mảng dữ liệu và lưu vào 1 file json
 * @param {array} arr - mảng dữ liệu ta muốn lưu
 * @param {string} filename - tên json file
 */
function exportJson(arr, filename) {
  // chuyển dữ liệu từ mảng arr sang json
  let jsonString = JSON.stringify(arr, null, 2);
  // lưu vào file json trong máy
  fs.writeFile(filename, jsonString, (err) => {
    if (err)
      throw err;
    console.log('Sản phẩm lưu vào file json ok!');
  });
}