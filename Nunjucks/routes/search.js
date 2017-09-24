const express = require("express");
const router = express.Router()

const db = require('../pgp')
// Top Category database
const category = require('../models/category')
const books = require('../models/book')

//Search
router.get('/', async function (req, res, next) {
    let searchText = req.query.search
    try{
      const getCategory = await category.getCategory()
      const getBook = await books.searchBook(searchText)
      res.render('index',{ 
        title: `Search for ${searchText}`,
        books: getBook,
        getCategory
      })
    } catch(err){
      console.log(err.message);
    }
    
  })

module.exports = router