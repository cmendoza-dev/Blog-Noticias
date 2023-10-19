var express = require('express');
var router = express.Router();
const controller = require('../controllers/postController');
const model = require('../models/post');

/* Inicio */
router.get('/', function(req, res, next) {
res.render('single');
});

router.get('/show/:id', async function (req, res) {
    const articleId = req.params.id;

    // Obtiene los comentarios del artículo desde tu base de datos
    const comments = await obtenerComentariosDesdeLaBaseDeDatos(articleId);

    res.render('single', { comments, id: articleId });
});


router.get('/:id', controller.getComments);

module.exports = router;
