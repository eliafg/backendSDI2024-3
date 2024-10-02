//Paquetes utilizados
const express = require('express');
const mongoose = require('mongoose');
const Content = require('./models/Content'); // Incluimos nuestra nuevo esquema definido
const cors = require('cors');
const dotenv = require('dotenv');
const _ = require('lodash'); // Import lodash for escaping


const app = express(); // Setup del server
const PORT = process.env.PORT || 3005; // Puerto a utilizar en nuestro servidor

// Utilizaremos el Middleware para hacer parsing de los JSON
dotenv.config({ path: './config.env' }); // Load environment variables from config.env
app.use(express.json());
app.use(cors());
// Set EJS as the templating engine
app.set('view engine', 'ejs');

// URI para la conexión a nuestro cliente de MongoDB
const mongoURI = process.env.ATLAS_URI; // Es necesario verificar que el puerto se alinie con el que se estableció en la conexión de Compass

// Conexión de mongoose a la conexión establecida en MongoDB Compass
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Método GET para nuestro servidor (mirar todos los contenidos)
// GET tutorial by "step" field
app.get('/tutorial/:step', async (req, res) => {
    const step = parseInt(req.params.step); // Parse step as a number (adjust if "step" is a string)
  
    try {
      const tutorial = await Content.findOne({ step }); // Find tutorial by "step" field
      if (!tutorial) {
        return res.status(404).json({ message: 'Tutorial not found' });
      }
      const escapedContent = _.escape(tutorial.code).replace(/\n/g, '<br>');
      // Render the 'tutorial.ejs' view and pass the tutorial content with newlines replaced by <br>
      res.render('tutorial', { tutorial, escapedContent });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Inicializar el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});