const path = require('path');
const Promise = require('bluebird');
const monitor = require('pg-monitor');

const cn = {
  host: "localhost",
  port: 5432,
  database: "itbook2",
  user: "postgres",
  password: "abc123"
};

const opts = {
  promiseLib: Promise
};

const pgp = require('pg-promise')(opts);
monitor.setTheme('bright');
const db = pgp(cn)

module.exports = db;