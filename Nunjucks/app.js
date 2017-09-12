const express = require("express");
const app = express()

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//Database
const {db} = require('./pgp')

//Import Routes
const index = require('./routes/index')
const detail = require('./routes/detail')
const category = require('./routes/category')
const author = require('./routes/author')
const api = require('./routes/api')

//Template Nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// View engine setup
app.set('views', './views')
app.set('view engine', 'njk')

app.use(express.static(__dirname + '/public'));

app.use('/', index)
app.use('/categories', category)
app.use('/books', detail)
app.use('/authors', author)
app.use('/api/v1', api)

module.exports = app

