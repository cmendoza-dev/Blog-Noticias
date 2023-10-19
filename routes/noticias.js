var express = require('express');
var router = express.Router();
var controller = require('../controllers/postController');

const Post = require('../models/post'); // Importa el modelo de publicación

// En tu controlador de rutas
router.get('/', async function (req, res, next) {
    try {
        const posts = await Post.find().exec();
        res.render('noticias', { noticias: posts }); // Pasar "noticias" como un objeto
    } catch (error) {
        next(error);
    }
});

// Ruta para manejar la adición de comentarios
router.post('/add-comment/:id', async (req, res, next) => {
    try {
        const postId = req.params.id; // Cambia 'req.body.postId' a 'req.params.id'
        const { autor, mensaje } = req.body;
        const fecha = new Date();

        // Encuentra el post al que se debe agregar el comentario
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send('Post no encontrado');
        }

        // Agrega el comentario al post
        post.comentarios.push({ autor, mensaje, fecha });
        await post.save();

        // Redirige de nuevo a la página de noticias
        res.redirect('/noticias');
    } catch (error) {
        next(error);
    }
});

// Esta ruta renderiza la vista 'noticias' con los comentarios
router.get('/:id/comentarios', controller.getComments);

// Esta ruta maneja la creación de comentarios
router.post('/:id/comentarios', controller.createComment);

module.exports = router;
