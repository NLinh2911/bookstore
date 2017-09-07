const express = require("express");
const router = express.Router()

const db = require('../pgp')

// Top Category database
const category = require('../models/category')
const books = require('../models/book')

// Home page
router.get('/', async function (req, res, next) {
  try {
    let getBook = await books.getBook(10)
    res.status(200).json(getBook)
  } catch (err) {
    console.log(err);
  }
})

router.get('/categories/', async function (req, res, next) {
  try {
    let getCategory = await category.getCategory()
    res.status(200).json(getCategory)
  } catch (err) {
    console.log(err);
  }
})

router.get('/categories/:topCategory', async function (req, res, next) {
  try {
    let topCategory = req.params.topCategory.replace(/-/gi, ' ')
    let getBookByTopCategory = await books.getBookByTopCategory(topCategory)
    res.status(200).json(getBookByTopCategory)
  } catch (err) {
    console.log(err)
  }
})

router.get('/categories/:topCategory/:subCategory', async function (req, res, next) {
  try {
    let topCategory = req.params.topCategory.replace(/-/gi, ' ')
    let subCategory = req.params.subCategory.replace(/-/gi, ' ')
    let getBookBySubCategory = await books.getBookBySubCategory(subCategory)
    res.status(200).json(getBookBySubCategory)
  } catch (err) {
    console.log(err)
  }
})

router.get('/authors/:name', async function (req, res, next) {
  try {
    let name = req.params.name.replace(/-/gi, ' ')
    let getBookByAuthor = await books.getBookByAuthor(name)
    res.status(200).json(getBookByAuthor)
  } catch (err) {
    console.log(err);
  }
})

router.get('/books/:title', async function (req, res, next) {
  try {
    let title = req.params.title.replace(/-/gi, ' ')()
    let getBook = await books.getSingleBook(title)
    res.status(200).json(getBook)
  } catch (err) {
    console.log(err);
  }
})

module.exports = router