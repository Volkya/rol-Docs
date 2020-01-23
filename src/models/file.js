const mongoose = require('mongoose');
const {Schema} = mongoose;

const FileSchema = new Schema({
    username: String,
    edad: Number,
    pb: String,
    empleo: String,
    grupo: String,
    raza: String,
    nacionalidad: String,
    orientacion: String,
    psicologia: String,
    fisico: String,
    historia: String,
    fuerza: String,
    destreza: String,
    agilidad: String,
    resistencia: String,
    inteligencia: String,
    percepcion: String
});

module.exports = mongoose.model('File', FileSchema);
