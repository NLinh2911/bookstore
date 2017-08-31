const express = require("express");

const app = express()

const nunjucks = require('nunjucks')
nunjucks.configure('views', {
    autoescape: true,
    express: app
})
let post = [
    {'thumbnail': 'http://www.allitebooks.com/wp-content/uploads/2017/08/Pro-Processing-for-Images-and-Computer-Vision-with-OpenCV.jpg',
    'title': 'Learning PHP 7',
    'author': 'Antonio Lopez',
    'content': 'PHP is a great language for building web applications. It is essentially a server-side scripting language that is also used for general purpose programming. PHP 7 is the latest version with a host of new features, and it provides major backwards-compatibility breaks. This book begins with the fundamentals…' 
}]
// Home page
app.get('/', function(req, res, next) {
    res.render('layout', {title: 'IT Book Store', post})
})

module.exports = app