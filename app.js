const express = require('express');
const app = express();
var path = require('path');
var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var singleRouter = require('./routes/single');
var contactRouter = require('./routes/contact');

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/category', categoryRouter);
app.use('/single', singleRouter);
app.use('/contact', contactRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
