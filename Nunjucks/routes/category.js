const express = require("express")
const router = express.Router()

const books = require('../models/book')
const category = require('../models/category')

router.get('/:topCategory', async function (req, res, next) {
    let topCategory = req.params.topCategory.replace(/-/gi, ' ')
    let pages_num = req.query.page || 1
    let book_quantity = await books.getNumsBookByCategory(topCategory)

    let root = req.params.topCategory
    if(req.query.page)
      root = '../'+req.params.topCategory

    let offset = 7 * (pages_num - 1)
    let pages = Math.ceil(parseInt(book_quantity.count)/7)
    
    let getCategory = await category.getCategory()
    let getBook = await books.getBookByTopCategory(topCategory, 7, offset)
    res.render('index', {
      title: 'IT Book Store',
      books: getBook,
      paginate : true,
      root : root,
      getCategory,
      pages
    })
})

router.get('/:topCategory/:subCategory', async function (req, res, next) {
  try {
    let topCategory = req.params.topCategory.replace(/-/gi, ' ')
    let subCategory = req.params.subCategory.replace(/-/gi, ' ')
    let getCategory = await category.getCategory()
    let getBookBySubCategory = await books.getBookBySubCategory(subCategory)
    res.render('index', {
      title: 'IT Book Store',
      books: getBookBySubCategory,
      getCategory
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router