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

//Import API
const index2 = require('./api/index');
const detail2 = require('./api/detail');
const author2 = require('./api/author')

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

app.use('/api/',index2)
app.use('/api/detail',detail2)
app.use('/api/author',author2)
module.exports = app