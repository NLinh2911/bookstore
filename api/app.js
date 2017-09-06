const express = require("express");
const app = express()

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//Database
const {db} = require('./pgp')

//Import Routes
const index = require('./routes/index')
// const detail = require('./routes/detail')
// const author = require('./routes/author')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

// app.use(express.static(__dirname + '/public'));

app.use('/', index)
// app.use('/categories', detail)
// app.use('/author', author)


module.exports = app