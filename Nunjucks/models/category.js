const db = require('../pgp')
module.exports = {

  getAllCategory: () => {
    return db.many(`SELECT * FROM category`)
  },

  getTopCategory: () => {
    return db.any(`SELECT name, id FROM category WHERE parent_id IS NULL`)
  },

  getSubCategory: (parent_id) => {
    return db.any(`SELECT name FROM category WHERE parent_id = $1`, parent_id)
  },

  getCategory: () => {
    return db.any(`
    SELECT c.id, c.name,
    (array(
          SELECT row_to_json(cc) 
          FROM category AS cc
          WHERE cc.parent_id = c.id)
      ) AS category
    FROM category as c WHERE parent_id IS Null
    `)
  }

}
