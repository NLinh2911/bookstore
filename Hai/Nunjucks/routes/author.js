const express = require("express");
const router = express.Router()

// Detail page
router.get('/:name', function(req, res, next) {
    // let name = req.params.name
    res.render('author')
})

module.exports = router