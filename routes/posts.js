var express = require('express');
var router = express.Router();
var controller = require('../controllers/postController');

router.get('/show/:id', function(req, res) {
    controller.detail (req, res);
});
router.post('/update', function(req, res) {
    controller.update(req, res);
});
router.get('/delete/:id', function (req, res) {
    controller.delete(req, res);
});

module.exports = router;
