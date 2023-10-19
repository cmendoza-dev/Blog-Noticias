var express = require('express');
var router = express.Router();
const controller = require('../controllers/postController');
const model = require('../models/post');

/* Inicio */
router.get('/', function(req, res, next) {
res.render('noticias');
});

router.get('/show/:id', async function (req, res) {
    const articleId = req.params.id;

    // Obtiene los comentarios del artículo desde tu base de datos
    const comments = await obtenerComentariosDesdeLaBaseDeDatos(articleId);

    res.render('noticias', { comments, id: articleId });
});

router.get('/:id', controller.getComments);

module.exports = router;
