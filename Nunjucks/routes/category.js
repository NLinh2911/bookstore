const express = require("express")
const router = express.Router()

const books = require('../models/book')
const category = require('../models/category')

router.get('/:topCategory', async function(req, res, next) {
    try {
      let topCategory = req.params.topCategory.replace(/-/gi, ' ')
      let getCategory = await category.getCategory()
      let getBookByTopCategory = await books.getBookByTopCategory(topCategory)
      res.render('index', {title: 'IT Book Store', books: getBookByTopCategory, getCategory})
    }
    catch (err) {
      console.log(err)
    }
  })
  
  router.get('/:topCategory/:subCategory', async function(req, res, next) {
    try {
      let topCategory = req.params.topCategory.replace(/-/gi, ' ')
      let subCategory = req.params.subCategory.replace(/-/gi, ' ')
      let getCategory = await category.getCategory()
      let getBookBySubCategory = await books.getBookBySubCategory(subCategory)
      res.render('index', {title: 'IT Book Store', books: getBookBySubCategory, getCategory})
    }
    catch (err) {
      console.log(err)
    }
  })

  module.exports = router