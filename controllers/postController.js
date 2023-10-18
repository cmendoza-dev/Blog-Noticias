let model = require("../models/post");

module.exports = {
    show: async function (req, res) {
        try {
            const items = await model.find({});
            res.render('category', { items });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    detail: async function (req, res) {
        try {
            let val_id = req.params.id;
            let data = await model.findOne({ _id: val_id });

            if (!data) {
                return res.status(404).json({ error: 'Objeto no encontrado.' });
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
        }
    },

    create: async function (req, res) {
        try {
            const { titulo, categoria, fecha, descripcion } = req.body;

            const newPost = new model({
                titulo,
                categoria,
                fecha,
                descripcion
            });

            await newPost.save();
            console.log('Nuevo post creado:', newPost);

            res.redirect('/category');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
        }
    },


    update: async function (req, res) {
        try {
            let val_id = req.body.id;
            let datos = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                categoria: req.body.categoria,
                fecha: req.body.fecha,
                comentarios: [
                    {
                        autor: String,
                        mensaje: String,
                        fecha: Date
                    }
                ]
            };

            let newData = await model.updateOne({ _id: val_id }, datos);

            res.send(newData);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },


    delete: async function (req, res) {
        try {
            let val_id = req.params.id;

            await model.deleteOne({ _id: val_id });

            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    addComment: async (req, res) => {
        const { postId, comment } = req.body;

        try {
            const post = await Post.findById(postId);
            post.comments.push(comment);
            await post.save();
            res.redirect(`/posts/${postId}`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error agregando comentario');
        }
    },

    getComments: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.json(post.comments);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error obteniendo comentarios');
        }
    },

    deleteComment: async (req, res) => {
        try {
            const { postId, commentId } = req.params;
            const post = await Post.findById(postId);
            const comment = post.comments.id(commentId);
            await comment.remove();
            await post.save();
            res.json({ message: 'Comentario eliminado' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error eliminando comentario');
        }
    }

};
