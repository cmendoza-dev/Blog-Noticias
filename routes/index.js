var express = require('express');
var router = express.Router();
var controller = require('../controllers/postController');

/* Categoria. */
router.get('/', function (req, res, next) {
    controller.show(req, res);
});

// Ruta para borrar un elemento
router.post('/borrar', function(req, res) {
    const _id = req.body._id;
    controller.delete(_id);
    res.json({ message: 'Documento borrado exitosamente' });
});


module.exports = router;
