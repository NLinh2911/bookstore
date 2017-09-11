const db = require('../pgp')
module.exports = {

  getBook: (limit) => {
    return db.many("SELECT * FROM book LIMIT $1", limit);
  },

  getBookByTopCategory: (category) => {
    return db.any("SELECT * FROM book WHERE top_category ILIKE $1", category);
  },

  getBookBySubCategory: (category) => {
    return db.any("SELECT * FROM book WHERE $1 ILIKE ANY (category)", category);
  },

  getBookByAuthor: (author) => {
    return db.any("SELECT * FROM book WHERE $1 ILIKE ANY (author)", author);
  },

  getSingleBook: (title) => {
    return db.oneOrNone("SELECT * FROM book WHERE title ILIKE $1", title);
  },

  searchBook: (text) => {
    return db.any("SELECT title FROM book WHERE document @@ plainto_tsquery($1)", text)
  }
}
