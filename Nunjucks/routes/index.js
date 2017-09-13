const express = require("express");
const router = express.Router()

const db = require('../pgp')


// Top Category database
const category = require('../models/category')
const books = require('../models/book')

// Home page
router.get('/', async function (req, res, next) {
  try {
    let getCategory = await category.getCategory()
    let getBook = await books.getBook(10)
    res.render('index', {
      title: 'IT Book Store',
      books: getBook,
      getCategory
    })
  } catch (err) {
    console.log(err);
  }
})

router.get('/search', function (req, res, next) {
  let searchText = req.query.search;
})


module.exports = router