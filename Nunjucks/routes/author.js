const express = require("express");
const router = express.Router()

<<<<<<< HEAD
// Detail page
router.get('/:name', function(req, res, next) {
    let name = req.params.name
    res.render('author')
=======
const books = require('../models/book')
const category = require('../models/category')
// Detail page
router.get('/:name', async function (req, res, next) {
  try {
    let name = req.params.name.replace(/-/gi, ' ')
    let getCategory = await category.getCategory()
    let getBookByAuthor = await books.getBookByAuthor(name)
    res.render('index', {
      title: 'IT Book Store',
      books: getBookByAuthor,
      getCategory
    })
  } catch (err) {
    console.log(err);
  }
>>>>>>> 72e91d26caa48033537703804fbd81f54a0afdef
})

module.exports = router