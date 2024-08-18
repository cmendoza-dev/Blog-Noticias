const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uri = "mongodb+srv://carlosmendoza:l0ieocdFvSuDsZHs@cluster0.i40h4.mongodb.net/posts?retryWrites=true&w=majority";

// mongoose.connect("mongodb://127.0.0.1:27017/posts");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));
// carlosmendoza
// l0ieocdFvSuDsZHs
// 190.236.29.29/32
const modelSchema = new Schema ({
  titulo: { type: String },
  descripcion: { type: String },
  categoria: { type: String },
  fecha: { type: Date },
  comentarios: {
    type: [{
      autor: String,
      mensaje: String,
      fecha: Date
    }],
    default: []
  }
});

// Método virtual para formatear la fecha antes de mostrarla
modelSchema.virtual('formattedFecha').get(function () {
  const fecha = this.fecha;
  const year = fecha.getFullYear();
  const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const day = fecha.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
});

const Contacto = mongoose.model('post', modelSchema);

module.exports = Contacto;