const db = require('../pgp')

module.exports = {
  getBookNums : () =>{
    return db.one("SELECT COUNT(id) FROM book")
  },

  getBookLimit: (limit, offset) =>{
    return db.many("SELECT * FROM book LIMIT $1 OFFSET $2", [limit, offset])
  },
  getNumsBookByCategory: (kind) => {
    return db.one("SELECT COUNT(id) FROM book WHERE top_category ILIKE $1", kind) 
  },
  getBookByTopCategory: (category, limit, offset) => {
    return db.any("SELECT * FROM book WHERE top_category ILIKE $1 LIMIT $2 OFFSET $3", [category, limit, offset]);
  },

  getBookBySubCategory: (category) => {
    return db.any("SELECT * FROM book WHERE $1 ILIKE ANY (category)", category);
  },

  getBookByAuthor: (author)=>{
    return db.any("SELECT * FROM book WHERE $1 ILIKE ANY (author)", author);
  },

  getSingleBook: (title) => {
    return db.oneOrNone("SELECT * FROM book WHERE title ILIKE $1", title);
  }, 

  searchBook: (text)=>{
    return db.any("SELECT * FROM book WHERE document @@ plainto_tsquery($1)", text)
  }
}
