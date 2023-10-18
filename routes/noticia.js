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

router.post('/:id/comments', postController.addComment);

router.get('/:id/comments', postController.getComments);

router.delete('/:id/comments/:commentId', postController.deleteComment);

module.exports = router;
