const express = require("express");

const app = express()

const nunjucks = require('nunjucks')
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// Home page
app.get('/', function(req, res, next) {
    res.render('layout', {title: 'IT Book Store'})
})

module.exports = app