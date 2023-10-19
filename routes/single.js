var express = require('express');
var router = express.Router();
const controller = require('../controllers/postController');
const model = require('../models/post');

/* Inicio */
router.get('/', function(req, res, next) {
res.render('single');
});

router.get('/show/:id', async function (req, res) {
    try {
        let val_id = req.params.id;
        let data = await model.findOne({ _id: val_id });

        if (!data) {
            return res.status(404).json({ error: 'Objeto no encontrado.' });
        }

        // Asegúrate de que data.comentarios esté definido y no sea null o vacío
        const comments = data.comentarios || [];

        res.render('single', { comments: comments }); // Asegúrate de que "comments" contenga los comentarios
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});


module.exports = router;
