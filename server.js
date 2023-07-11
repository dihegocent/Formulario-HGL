const express = require('express');
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/tomografia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = 3000;

// Definir un modelo de datos para los estudios
const EstudioSchema = new mongoose.Schema({
  radiologo: String,
  estudio: String,
  fecha: Date,
  contraste: Boolean,
});

const Estudio = mongoose.model('Estudio', EstudioSchema);

// Middleware para procesar JSON
app.use(express.json());

// Endpoint para guardar un nuevo estudio
app.post('/estudios', (req, res) => {
  const estudioData = req.body;

  const estudio = new Estudio(estudioData);

  estudio.save()
    .then(() => {
      res.status(201).json({ message: 'Estudio guardado correctamente.' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al guardar el estudio.' });
    });
});

// Endpoint para obtener todos los estudios
app.get('/estudios', (req, res) => {
  Estudio.find()
    .then((estudios) => {
      res.json(estudios);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los estudios.' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});