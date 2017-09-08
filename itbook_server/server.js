const express = require('express');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = '3000';
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const opts = {
  promiseLib: Promise
};
const pgp = require('pg-promise')(opts);
const cn = {
  host: 'localhost',
  port: '5432',
  database: 'itbook2',
  user: 'postgres',
  password: 'abc123'
};

const db = pgp(cn);

app.get('/api/categories', (req, res) => {
  db
    .any(
      `
      SELECT c.id,c.name,ARRAY(
        SELECT row_to_json(cc) 
        FROM category as cc 
        WHERE cc.parent_id = c.id
      )
      FROM category as c
      WHERE parent_id IS NULL
    `
    )
    .then(data => res.json(data));
});

app.get('/api/books', (req, res) => {
  // console.log(req);
  console.log(req.query.filter);
  let offsetNum = req.query.filter.offsetNum;
  let fetchNum = req.query.filter.fetchNum;
  db
    .any(
      'SELECT id,title,author,image FROM public.book ORDER BY id ASC OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY',
      [+offsetNum, +fetchNum]
    )
    .then(data => res.json(data));
});

app.get('/api/book-detail', (req, res) => {
  console.log(req.query.bookDetail.bookID);
  let bookID = req.query.bookDetail.bookID;
  db
    .any('SELECT * FROM public.book WHERE id = $1', [+bookID])
    .then(data => res.json(data));
});

app.get('/api/books-by-cateid/:cateID', (req, res) => {
  let cateID = req.params.cateID;
  console.log(req.params);
  db
    .any('SELECT * FROM public.book WHERE $1 ILIKE ANY (category)',[cateID])
    .then(data => res.json(data));
});

app.listen(PORT, () => {
  console.log(`RESTful server's listenning on port ${PORT}`);
});
