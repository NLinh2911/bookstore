const express = require("express");
const router = express.Router()

// Detail page
router.get('/book/:book', function(req, res, next) {
    let categories = req.params.categories
    let category = req.params.category
    let book = req.params.book
    res.render('detail')
})

module.exports = router