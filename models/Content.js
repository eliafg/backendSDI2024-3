// file: "models/content.js"

const mongoose = require('mongoose');

// Definimos el esquema y lo invocamos cuando sea llamado en app.js
const contentSchema = new mongoose.Schema({
  step: {
    type: Number,
    required: true,
  },
  file: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: true,
  }
  // Puedes agregar los campos que sea, revisa los tipos de BSON para saber qué agregar
});

const Content = mongoose.model('tutorial', contentSchema, 'tutorial');

module.exports = Content;