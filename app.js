const express = require('express');
const app = express();
var path = require('path');
var indexRouter = require('./routes/index');
var noticiasRouter = require('./routes/noticias');
var postRouter = require('./routes/post');
var editarPostRouter = require('./routes/editarPost');
var postsRouter = require('./routes/posts');

// Configura el motor de vistas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/noticias', noticiasRouter);
app.use('/post', postRouter);
app.use('/update', editarPostRouter);
app.use('/posts', postsRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
