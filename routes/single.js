var express = require('express');
var router = express.Router();
const controller = require('../controllers/postController');

const Post = require('../models/post'); // Importa el modelo de publicación

router.get('/:id', async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post no encontrado');
        }
        res.render('single', { post: post });
    } catch (error) {
        next(error);
    }
});

// Esta ruta renderiza la vista 'single' para una publicación individual
router.get('/:id', controller.detail);

module.exports = router;
