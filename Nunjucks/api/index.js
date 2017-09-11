const express = require("express");
const router = express.Router()

const db = require('../pgp');

// Top Category database
const category = require('../models/category');
const Book = require('../models/book');

// Home page
router.get('/', async function(req, res, next) {
  try {
    let getCategory = await category.getCategory();
    let getBook = await Book.getBook(15);
    res.json({getCategory, getBook})
  } catch (error) {
    console.log(error);
  }
})

// router.get('/:category', async function(req, res, next) {
//   try {
//     let category = req.params.category
//     let getBookByCategory = await Book.getBookByTopCategory(category)
//     res.json(getBookByCategory)
//   } catch (error) {
//     console.log(error);
//   }
// })

module.exports = router
