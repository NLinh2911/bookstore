const db = require('./pgp');

module.exports = {
  getAllCategory: () => {
    return db.many("SELECT * FROM category");
  },
  getTopCategory: () => {
    return db.many("SELECT * FROM category WHERE parent_id IS NULL")
  },
  getSubCategory: (parent_id) => {
    return db.any("SELECT * FROM category WHERE parent_id = $1", parent_id)
  }
}