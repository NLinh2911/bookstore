const express = require("express");
const index = require('./routes/index')

const app = express()


// View engine setup
app.set('views', './views')
app.set('view engine', 'nunjucks')

app.use(express.static(__dirname + '/public'));

app.use('/', index)

module.exports = app