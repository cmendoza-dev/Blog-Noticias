const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/users");

const modelSchema = new Schema ({
    titulo: {type: String},
    descripcion: {type: String},
    categoria: {type: String},
    fecha: {type: String},
    comentarios: [
        {
          autor: String,
          mensaje: String,
          fecha: Date
        }
      ]
});

const Contacto = mongoose.model('contacts', modelSchema);

module.exports = Contacto;
