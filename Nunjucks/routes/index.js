const express = require("express");
const router = express.Router()

<<<<<<< HEAD
const {db} = require('../pgp')


// Top Category database
const Category = require('../models/category')
const category = new Category(db)

let books = [
  {
    'categories': 'Web Development',
    'category': 'PHP',
    'thumbnail': 'http://www.allitebooks.com/wp-content/uploads/2017/08/Pro-Processing-for-Images-and-Computer-Vision-with-OpenCV.jpg',
    'title': 'Learning PHP 7',
    'author': ['Harry J.W. Percival', 'James'],
    'content': 'PHP is a great language for building web applications. It is essentially a server-side scripting language that is also used for general purpose programming. PHP 7 is the latest version with a host of new features, and it provides major backwards-compatibility breaks. This book begins with the fundamentals…' 
  },
  {
    'categories': 'Web Development',
    'category': 'Python',
    'thumbnail': 'http://www.allitebooks.com/wp-content/uploads/2017/08/Test-Driven-Development-with-Python-2nd-Edition.jpg',
    'title': 'Test-Driven Development with Python, 2nd Edition',
    'author': ['Harry J.W. Percival'],
    'content': 'By taking you through the development of a real web application from beginning to end, the second edition of this hands-on guide demonstrates the practical advantages of test-driven development (TDD) with Python. You’ll learn how to write and run tests before building each part of your app, and then develop…'
  }
]


// Home page
router.get('/', async function(req, res, next) {
  let getCategory = await category.getCategory()

  res.render('layout', {title: 'IT Book Store', books, getCategory})
})


router.get('/top-category', function (req, res, next) {
  
=======
const db = require('../pgp')


// Top Category database
const category = require('../models/category')
const books = require('../models/book')

// Home page
router.get('/', async function (req, res, next) {
  try {
    let getCategory = await category.getCategory()
    let getBook = await books.getBook(10)
    res.render('index', {
      title: 'IT Book Store',
      books: getBook,
      getCategory
    })
  } catch (err) {
    console.log(err);
  }
})

router.get('/search/:text', function (req, res, next) {
  let searchText = req.query.text;
>>>>>>> 72e91d26caa48033537703804fbd81f54a0afdef
})


module.exports = router