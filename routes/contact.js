var express = require('express');
var router = express.Router();
var controller = require('../controllers/postController');


/* Inicio */
router.get('/', function(req, res, next) {
    controller.create(req, res);
});

router.post('/crear_post', function(req, res) {
    const { titulo, categoria, fecha, descripcion } = req.body;

    // Crea un nuevo post en tu base de datos
    controller.create(titulo, categoria, fecha, descripcion);

    // Redirige a la página principal o a donde desees después de crear el post
    res.redirect('/category');
});

module.exports = router;
