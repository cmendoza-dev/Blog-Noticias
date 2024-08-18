let model = require("../models/post");

module.exports = {
    show: async function (req, res) {
        try {
            const items = await model.find({}).sort({ fecha: -1 });
            res.render('index', { items });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    create: async function (req, res) {
        try {
            // extraer las propiedades
            const { titulo, categoria, fecha, descripcion } = req.body;
            // llenar las propiedades
            const newPost = new model({
                titulo,
                categoria,
                fecha,
                descripcion
            });

            await newPost.save();

            console.log('Nuevo post creado:', newPost);
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
        }
    },

    mostrarFormularioEditar: async function (req, res) {
        // tomar el valor del parámetro
        const id = req.params.id;

        try {
            const elemento = await model.findById(id);
            console.log(elemento); // Verifica si se obtiene el elemento
            res.render('editarPost', { elemento: elemento });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al obtener el elemento.' });
        }
    },

    editarElemento: async function (req, res) {
        const id = req.params.id;
        console.log(id);
        const newData = {
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            fecha: req.body.fecha,
            descripcion: req.body.descripcion
        };

        try {
            const elementoActualizado = await model.findByIdAndUpdate(id, newData);
            console.error(elementoActualizado);
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al editar el elemento.' });
        }
    },

    delete: async function (_id) {
        try {
            const deletedDocument = await model.findByIdAndRemove(_id);
            console.log('Documento borrado:', deletedDocument);
        } catch (error) {
            console.error(error);
        }
    },

    // Comentarios
    getComments: async function (req, res) {
        try {
            const postId = req.params.id;
            const post = await model.findById(postId);
            const comments = post.comentarios;
            res.render('noticias', { comments, post });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al obtener comentarios.' });
        }
    },

    createComment: async function (req, res) {
        try {
            const postId = req.params.id;
            const newComment = {
                autor: req.body.autor,
                mensaje: req.body.mensaje,
                fecha: new Date()
            };

            const post = await model.findById(postId);

            if (!post) {
                return res.status(404).json({ error: 'Publicación no encontrada.' });
            }

            post.comentarios.push(newComment);
            await post.save();

            res.redirect(`/noticias/${postId}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
        }
    },

    updateComment: async function (req, res) {
        try {
            let postId = req.params.id;
            let commentId = req.params.commentId;

            // Implementa la lógica para actualizar el comentario aquí
            res.redirect(`/show/${postId}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
        }
    },

    deleteComment: async function (req, res) {
        try {
            let postId = req.params.id;
            let commentId = req.params.commentId;

            // Implementa la lógica para eliminar el comentario aquí
            res.redirect(`/show/${postId}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
        }
    }
};
