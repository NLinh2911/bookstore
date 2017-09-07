const express = require("express");
const router = express.Router()

const {db} = require('../pgp')


// Top Category database
const Category = require('../models/category')
const category = new Category(db)

// Home page
router.get('/', async function(req, res, next) {
  let getCategory = await category.getCategory()

  res.render('layout', {title: 'IT Book Store', books, getCategory})
})


router.get('/search', function (req, res, next) {
  let searchText = req.query.text; 
})


module.exports = router