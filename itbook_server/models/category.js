const db = require('../pgp');

module.exports = {
  getCategory() {
    return db.any(
      `SELECT c.id,c.name,ARRAY(
        SELECT row_to_json(cc) 
        FROM category as cc 
        WHERE cc.parent_id = c.id)
      FROM category as c
      WHERE parent_id IS NULL`
    );
  }
};
