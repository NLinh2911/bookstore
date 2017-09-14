const db = require('../pgp');

module.exports = {
  getBook(offsetNum, fetchNum) {
    return db.any(
      `SELECT id,title,author,image 
        FROM public.book ORDER BY id ASC 
        OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY`,
      [+offsetNum, +fetchNum]
    );
  },
  getBookByCateName(cateName) {
    return db.any(
      `
      SELECT id,title,author,image 
      FROM public.book 
      WHERE $1 ILIKE ANY (category);
      `,
      [cateName]
    );
  },
  getBookByAuthor() {},
  getSingleBook(bookID) {
    return db.any(
      `SELECT * FROM public.book 
        WHERE id = $1`,
      [+bookID]
    );
  },
  getSearchBook(strQuery) {
    return db.any(
      `
      SELECT id,title,author,image 
      FROM book WHERE document @@ to_tsquery($1) 
      ORDER BY id ASC;
      `,
      [strQuery]
    );
  },

  //test
  getAllBook() {
    return db.any('select * from public.book');
  }
};
