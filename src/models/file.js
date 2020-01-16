const mongoose = require('mongoose');
const {Schema} = mongoose;

const FileSchema = new Schema({

});

module.exports = mongoose.model('File', FileSchema);
