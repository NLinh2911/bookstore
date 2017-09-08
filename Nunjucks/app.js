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
//Import API
const authorapi = require('./api/author')
const detailapi = require('./api/detail')
const indexapi = require('./api/index')

//Template Nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// View engine setup
app.set('views', './views')
app.set('view engine', 'njk')

app.use(express.static(__dirname + '/public'));

app.use('/', index)
app.use('/categories', category)
app.use('/books', detail)
app.use('/authors', author)
app.use('/api/author', authorapi)
app.use('/api/detail', detailapi)
app.use('/api/', indexapi)

module.exports = app
