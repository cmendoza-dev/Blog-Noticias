var express = require('express');
var router = express.Router();

/* Inicio */
router.get('/', function(req, res, next) {
res.render('single');
});

module.exports = router;
