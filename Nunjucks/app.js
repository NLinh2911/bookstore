const express = require("express");
const app = express()

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//Database
const {db} = require('./pgp')

//Import Routes
const index = require('./routes/index')
const detail = require('./routes/detail')
const author = require('./routes/author')


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
app.use('/categories', detail)
app.use('/author', author)


module.exports = app