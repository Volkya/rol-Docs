const mongoose = require('mongoose');
const {Schema} = mongoose;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});
// ciframos password
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt); // lo que puso y lo que generamos
    // return hash;
};

// nuevo acceso con pass cifrado
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password); // compare old with new pass
};

module.exports = mongoose.model('User', UserSchema);
