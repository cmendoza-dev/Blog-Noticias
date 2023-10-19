var express = require('express');
var router = express.Router();
var controller = require('../controllers/postController');

router.post('/create', function(req, res) {
    controller.create(req, res);
});

router.get('/show/:id', async function (req, res) {
    // obtener comentarios
    const comments = // obtener comentarios de la DB

    res.render('single', {
        comments: comments
    })
})

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
