const express = require("express");
const router = express.Router()

const db = require('../pgp');

// Top Category database
const Category = require('../models/category');
// const category = new Category(db);
const Book = require('../models/book')

// Author page
router.get('/:author', async function(req, res, next) {
try {
  let authorName = req.params.author;
  let getCategory = await Category.getCategory();
  let getBookByAuthor = await Book.getBookByAuthor(authorName);

  let author = {
    getCategory,
    getBookByAuthor
  }

  res.json(author)
}
catch (error) {
  console.log(error);
}

})


module.exports = router
