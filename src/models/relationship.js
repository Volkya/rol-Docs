const mongoose = require('mongoose');
const { Schema } = mongoose;

const NetworkSchema = new Schema({
    username: {type: String},
    parejas: {},
    amigos: {},
    familia: {},
    conocidos: {},
    exparejas: {},
    otros: {type: String}
});

module.exports = mongoose.model('Relationship', NetworkSchema);
