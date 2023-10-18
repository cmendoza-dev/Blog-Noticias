var express = require('express');
var router = express.Router();
var controller = require('../controllers/postController');

/* Categoria. */
router.get('/', function (req, res, next) {
    controller.show(req, res);
});

module.exports = router;
