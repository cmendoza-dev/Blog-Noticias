var express = require('express');
var router = express.Router();
var controller = require('../controllers/postController');

router.get('/', function(req, res, next) {
    res.render('editarPost');
});

router.get('/:id', controller.mostrarFormularioEditar);

router.post('/:id', controller.editarElemento);



module.exports = router;