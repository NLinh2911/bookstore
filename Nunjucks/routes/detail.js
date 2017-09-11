<<<<<<< HEAD
const express = require("express");
const router = express.Router()

// Detail page
router.get('/:categories/:category/:book', function(req, res, next) {
    let categories = req.params.categories
    let category = req.params.category
    let book = req.params.book
    res.render('detail')
=======
const express = require("express")
const router = express.Router()

const books = require('../models/book')
const category = require('../models/category')

// Detail page

router.get('/:title', async function (req, res, next) {
  try {
    let title = req.params.title.replace(/-/gi, ' ')
    let getCategory = await category.getCategory()
    let getBook = await books.getSingleBook(title)
    res.render('detail', {
      book: getBook,
      getCategory
    })
  } catch (err) {
    console.log(err);
  }
>>>>>>> 72e91d26caa48033537703804fbd81f54a0afdef
})

module.exports = router