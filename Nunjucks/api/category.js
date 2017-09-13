const express = require("express");
const router = express.Router()

const db = require('../pgp');

// Top Category database
const Category = require('../models/category');

const Book = require('../models/book')

//Category page
router.get('/:category', async function(req,res) {
  try{
    let category = req.params.category;
    let getBookByTopCategory = await Book.getBookByTopCategory(category);
    let getCategory = await Category.getCategory(); 
    // console.log('getBookByTopCategory', getBookByTopCategory);
    res.json({getCategory, getBookByTopCategory})
  }
  catch (error) {
    console.log(error)
  }
})
router.get('/:topCategory/:subCategory', async function(req,res) {
  try {
    let category = req.params.topCategory.replace(/-/gi, ' ');
    let subCategory = req.params.subCategory.replace(/-/gi, ' ');
    let getBookBySubCategory = await Book.getBookBySubCategory(subCategory);
    res.json({getBookBySubCategory});
  }
  catch (error) {
    console.log(error)
  }
})


module.exports = router;