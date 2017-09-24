const express = require("express");
const router = express.Router()

const db = require('../pgp')
// Top Category database
const category = require('../models/category')
const books = require('../models/book')

// Home page
router.get('/', async (req, res, next)=>{
  let pages_num = req.query.page || 1;
  let book_quantity = await books.getBookNums()

  let offset = 10 * (pages_num - 1);
  let pages = Math.ceil(parseInt(book_quantity.count)/10)

  let currentPage = parseInt(pages_num)

  let getCategory = await category.getCategory()
  let getBook = await books.getBookLimit(10, offset)

  res.render('index',{
    title: 'IT Book Store',
    books : getBook,
    paginate : true,
    currentPage,
    root : '',
    getCategory,
    pages
  });
});

module.exports = router