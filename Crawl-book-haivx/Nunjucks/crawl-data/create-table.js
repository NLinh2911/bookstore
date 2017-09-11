
const path = require('path');
const pgp = require('pg-promise');

const db = require('../pgp');

function sql(file) {
  return new pgp.QueryFile(path.join(__dirname, file), {
    minify: true
  });
}

const script = sql('itbook2.sql');
let result = db
  .result(script)
  .then(function () {
    return "success";
  })
  .catch((error) => {
    console.log(error);
    return "failed";
  });