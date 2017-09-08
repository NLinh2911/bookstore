const db = require('../pgp');
const data = require('./total_product.json')

data.forEach(book => {
  db
    .one('INSERT INTO book VALUES(${id}, ${title}, ${author}, ${isbn_10}, ' +
      '${year}, ${language}, ${pages}, ${file_size}, ${file_format}, ${category}, ${image}, ${description}, ${download_link}, ${read_link}) ON CONFLICT DO NOTHING RETUR' +
      'NING *', book)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err);
    })
})