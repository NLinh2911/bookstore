const express = require("express");
const router = express.Router()

const db = require('../pgp');

// Top Category database
const Category = require('../models/category');
const category = new Category(db);

const Book = require('../models/book')

// Detail page
router.get('/:title', async function(req, res, next) {
  let title = req.params.title;
  let getCategory = await category.getCategory();
  let getSingleBook = await Book.getSingleBook(title);

  res.json({getCategory, getSingleBook})
})


module.exports = router