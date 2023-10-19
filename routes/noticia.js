var express = require('express');
var router = express.Router();
var controller = require('../controllers/postController');

router.post('/create', function(req, res) {
    controller.create(req, res);
});

router.get('/show/:id', function(req, res) {
    controller.detail (req, res);
});

router.post('/update', function(req, res) {
    controller.update(req, res);
});

router.get('/delete/:id', function (req, res) {
    controller.delete(req, res);
});

router.post('/comment/create/:id', function (req, res) {
    controller.createComment(req, res);
});

router.post('/comment/update/:id/:commentId', function (req, res) {
    controller.updateComment(req, res);
});

router.get('/comment/delete/:id/:commentId', function (req, res) {
    controller.deleteComment(req, res);
});

module.exports = router;
