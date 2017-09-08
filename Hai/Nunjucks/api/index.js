const express = require("express");
const router = express.Router()

const db = require('../pgp');

// Top Category database
const Category = require('../models/category')
const category = new Category(db);

const Book = require('../models/book');

// Home page
router.get('/', async function(req, res, next) {
  let getCategory = await category.getCategory();
  let getBook = await Book.getBook(15);

  res.json({getCategory, getBook})
})


router.get('/:category', async function(req, res, next) {
  let category = req.params.category

  let getBookByCategory  = await Book.getBookByCategory(category)
  res.json(getBookByCategory)
})


module.exports = router