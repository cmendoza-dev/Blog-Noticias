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

            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
        }
    },

    mostrarFormularioEditar: async function(req, res) {
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

    getComments: async function (req, res) {
        const id = req.params.id;
        const data = await model.findById(id);
        // obtener comentarios
        const comments = data.comentarios;
        res.render('noticias', {
            comments
        });
    },

    createComment: async function (req, res) {
        try {
            let postId = req.params.id;
            let newComment = {
                autor: req.body.autor,
                mensaje: req.body.mensaje,
                fecha: new Date()
            };

            await model.updateOne(
                { _id: postId },
                { $push: { comentarios: newComment } }
            );

            res.redirect(`/show/${postId}`);
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
