const session = require('express-session');
const express = require('express');
const app = express();
app.use(express.static('public'));

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(
  session({
    cookie: { maxAge: 3600 * 1000, secure: false },
    secret: 'test',
    resave: false,
    saveUninitialized: true
  })
);

const db = require('./pgp');

const api = require('./routes/api');
app.use('/', api);

const PORT = '3000';
app.listen(PORT, () => {
  console.log(`RESTful server's listenning on port ${PORT}`);
});
