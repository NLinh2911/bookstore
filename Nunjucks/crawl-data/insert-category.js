const db = require('../pgp');

const topcat = require('./json-data/topcat.json');
const subcat1 = require('./json-data/subcat1.json');
const subcat2 = require('./json-data/subcat2.json');
const subcat3 = require('./json-data/subcat3.json');
const subcat5 = require('./json-data/subcat5.json');
const subcat6 = require('./json-data/subcat6.json');
const subcat7 = require('./json-data/subcat7.json');
const subcat8 = require('./json-data/subcat8.json');
const subcat9 = require('./json-data/subcat9.json');
const subcat11 = require('./json-data/subcat11.json');
const subcat15 = require('./json-data/subcat15.json');

const data = [
  ...topcat,
  ...subcat1,
  ...subcat2,
  ...subcat3,
  ...subcat5,
  ...subcat6,
  ...subcat7,
  ...subcat8,
  ...subcat9,
  ...subcat11,
  ...subcat15
]

console.log(data.length);

data.forEach(cat => {
  db.one('INSERT INTO category VALUES (${id}, ${name}, ${parent_id}) RETURNING *', cat)
    .then(result => {
      //console.log(result);
    }).catch(err => {
      console.log(err);
    })
})