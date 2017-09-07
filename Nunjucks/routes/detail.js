const express = require("express")
const router = express.Router()

const books = require('../models/book')
const category = require('../models/category')

// Detail page

router.get('/:title', async function(req, res, next) {
    try {
        let title = req.params.title.replace(/-/gi, ' ')
        console.log(title);
        let getCategory = await category.getCategory()
        let getBook = await books.getSingleBook(title) 
        res.render('detail', {book: getBook, getCategory })
    }
    catch (err) {
      console.log(err);
    }
  })

module.exports = router