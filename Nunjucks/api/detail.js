const express = require("express");
const router = express.Router()

const db = require('../pgp');

// Top Category database
const Category = require('../models/category');
// const category = new Category(db);

const Book = require('../models/book')

// Detail page
router.get('/:title', async function(req, res, next) {
  try {
    let title = req.params.title;
    let getCategory = await Category.getCategory();
    let getSingleBook = await Book.getSingleBook(title);

    res.json({getCategory, getSingleBook})
  } catch (error) {
    console.log(error);
  }
})

module.exports = router
