var express = require('express');
var router = express.Router();
var controller = require('../controllers/postController');


/* Inicio */
router.get('/', function(req, res, next) {
    res.render('contact');
});

router.post('/', function(req, res) {
    controller.create(req, res);
});

module.exports = router;
