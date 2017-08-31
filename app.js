const express = require("express");
const index = require('./routes/index')

const app = express()

let post = [
    {'thumbnail': 'http://www.allitebooks.com/wp-content/uploads/2017/08/Pro-Processing-for-Images-and-Computer-Vision-with-OpenCV.jpg',
    'title': 'Learning PHP 7',
    'author': 'Antonio Lopez',
    'content': 'PHP is a great language for building web applications. It is essentially a server-side scripting language that is also used for general purpose programming. PHP 7 is the latest version with a host of new features, and it provides major backwards-compatibility breaks. This book begins with the fundamentals…' 
}]
app.locals.post = post;

// View engine setup
app.set('views', './views')
app.set('view engine', 'nunjucks')

app.use(express.static(__dirname + '/public'));

app.use('/', index)

module.exports = app