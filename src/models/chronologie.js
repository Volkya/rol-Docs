const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChroSchema = new Schema({
    username: {type: String},
    titlePost: {type: String},
    descriptionPost: {type: String},
    statusPost: {type: String},
    linkPost: {type: String}
});

module.exports = mongoose.model('Chronologie', ChroSchema);
