var express = require('express');
var router = express.Router();

/* Categoria. */
router.get('/', function (req, res, next) {
    res.render('category');
});

module.exports = router;
