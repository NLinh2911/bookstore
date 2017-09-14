const express = require('express');
const router = express.Router();

const db = require('../pgp');

const category = require('../models/category');
const book = require('../models/book');

const catchErr = err => {
  throw new Error(err + '');
};

//HomePage
router.get('/api/books', (req, res) => {
  let offsetNum = req.query.filter.offsetNum;
  let fetchNum = req.query.filter.fetchNum;
  book
    .getBook(offsetNum, fetchNum)
    .then(data => res.status(200).json(data))
    .catch(err => {
      throw new Error(err + '');
    });
});

router.get('/api/books-by-cate/:cateName', (req, res) => {
  let cateName = req.params.cateName;
  book
    .getBookByCateName(cateName)
    .then(data => res.status(200).json(data))
    .catch(err => {
      throw new Error(err + '');
    });
});

//Menu - RootApp
router.get('/api/categories', (req, res) => {
  category
    .getCategory()
    .then(data => res.status(200).json(data))
    .catch(err => {
      throw new Error(err + '');
    });
});

//DetailPage
router.get('/api/book/:bookID', (req, res) => {
  let bookID = req.params.bookID;
  book
    .getSingleBook(bookID)
    .then(data => res.json(data))
    .catch(err => {
      throw new Error(err + '');
    });
});

router.get('/api/search/:strQuery', (req, res) => {
  let strQuery = req.params.strQuery;
  console.log(strQuery);
  book
    .getSearchBook(strQuery)
    .then(data => res.json(data))
    .catch(err => {
      throw new Error(err + '');
    });
});

module.exports = router;
