const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser');
const db = require('../pgp');

// Top Category database
const category = require('../models/category');
const Book = require('../models/book');

router.use(bodyParser.urlencoded ({
	extended: true
}));
router.use (bodyParser.json());

// Home page
router.get('/', async(req,res,next) => {
  try{
      let pages_num = req.query.page || 1;
      let book_quantity = await Book.getBookNums();
      let offset = 5 * (pages_num * 1);
      let pages = Math.ceil(parseInt(book_quantity.count)/5);
      let getCategory = await category.getCategory();
      let getBook = await Book.getBookLimit(5, offset);
      res.json({
        pages_num,
        pages,
        book_quantity,
        offset,
        getCategory,
        getBook
      })
      next();
  }
  catch (error) {
    console.log(error);
  }
})

router.post('/', async (req,res) => {
  let pages_num = req.body.id
  let offset = 5 * (pages_num * 1);
  try{
    let getBook =  await Book.getBookLimit(5, offset);
    // console.log('getBook', getBook);
    res.json(getBook)
  }
  catch (error) {
    console.log(error);
  }
})
router.post('/search', async function (req, res, next) {
  let searchText = req.body.searchvalue
  console.log('searchText', searchText);
  try {
    let getBook = await Book.searchBook(searchText);
    res.json({
      getBook
    })
  }
  catch(error) {
    console.log(error)
  }
})

module.exports = router
