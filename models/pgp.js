
//======CONNECT TO POSTGRESQL DATABASE======
const Promise = require('bluebird');
const monitor = require("pg-monitor");

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'itbook2',
  user: 'postgres',
  password: 'abc'
};

const options = {
  promiseLib: Promise // overriding the default (ES6 Promise);
};
const pgp = require('pg-promise')(options);
// Khi có lỗi phải bật monitor để quan sát câu lệnh SQL 
monitor.attach(options);
monitor.setTheme('bright');

module.exports = pgp(cn);