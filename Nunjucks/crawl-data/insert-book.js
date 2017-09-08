const db = require('../pgp');
const data = require('./total_product.json')

data.forEach(book => {
  db
    .one("INSERT INTO book VALUES(${id}, ${title}, ${author}, ${isbn_10}, ${" +
      "year}, ${language}, ${pages}, ${file_size}, ${file_format}, ${top_category}, ${category}, ${image" +
      "}, ${description}, ${download_link}, ${read_link}, to_tsvector(${title} || '. ' " +
      "|| array_to_string(${author}, ',') || ${isbn_10} || '. ' || ${year} || '. ' || $" +
      "{language} || '. ' || ${top_category} || '. ' ||array_to_string(${category}, ',') || '. ' || ${description" +
      "})) ON CONFLICT DO NOTHING RETURNING * ",
  book)
    .then(result => {
      console.log(result.id)
    })
    .catch(err => {
      console.log(err);
    })
})