const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.set('useFindAndModify', false);
mongoose.connect(mongodb.DEV, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
