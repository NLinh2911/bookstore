const fs = require('fs');

const productData1 = require('./json-data/product_data1.json');
const productData2 = require('./json-data/product_data2.json');
const productData3 = require('./json-data/product_data3.json');
const productData4 = require('./json-data/product_data4.json');
const productData5 = require('./json-data/product_data5.json');
const productData7 = require('./json-data/product_data7.json');
const productData8 = require('./json-data/product_data8.json');
const productData9 = require('./json-data/product_data9.json');
const productData10 = require('./json-data/product_data10.json');
const productData11 = require('./json-data/product_data11.json');

const total = [
  ...productData1,
  ...productData2,
  ...productData3,
  ...productData4,
  ...productData5,
  ...productData7,
  ...productData8,
  ...productData9,
  ...productData10,
  ...productData11,
]
const data = total.map((ele, index) => {
  ele["id"] = index + 1
  return ele;
});
console.log(data.length);

let json = JSON.stringify(data, null, 2);

fs.writeFile('total_product.json', json, (err) => {
  if (err)
    throw err;
  console.log('Sản phẩm lưu vào file json ok!');
});