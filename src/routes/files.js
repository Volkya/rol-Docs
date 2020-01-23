const express = require('express');
const router = express.Router();
const File = require('../models/file');

router.get('/', (req, res) => {
    res.send('HOla');
});

router.get('/files/add' , (req, res) => {
    res.render('files/new-file', {title: 'New file'});
});

router.post('/files/add', async (req, res) => {
    const { username,
        edad, pb, empleo, grupo, raza,
        nacionalidad, orientacion, psicologia,
        fisico, historia, fuerza, destreza,
        agilidad, resistencia, inteligencia, percepcion } = req.body;
    const errors = [];
    if(!username){
       errors.push({text: "Please, fill the username"});
    }
    if (!historia){
        errors.push({text: 'Por favor, rellena la historia'});
    }
    if (errors.length > 0){ // si hay errores
        res.render('/files/add', {
            errors,
            username,
            fisico,
            psicologia,
            historia
        });
    }else {
        const newFile = new File({username, historia, fisico, psicologia});
        await newFile.save();
    // req.flash('success_msg', 'File added succefully');
    res.redirect('/files')
    }
    console.log(req.body);
});

router.get('/files/edit', (req, res) => {
   res.render('files/edit-file');
});

router.get('/files', (req, res) => {
    // res.render('files/all-files');
    res.send('HOla');
});

module.exports = router;
