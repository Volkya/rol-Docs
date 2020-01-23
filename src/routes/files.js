const express = require('express');
const router = express.Router();
const File = require('../models/file');

router.get('/files', async (req, res) => {
    // res.render('files/all-files');
    const files = await File.find().sort({date: 'desc'});
    res.render('files/all-files', {files});
});

router.get('/files/add' , async (req, res) => {
    res.render('files/new-file');
});

router.post('/files/add', async (req, res) => {
    const { username,
        edad, pb, empleo, grupo, raza,
        nacionalidad, orientacion, psicologia,
        fisico, historia, fuerza, destreza,
        agilidad, resistencia, inteligencia, percepcion } = req.body;
    const errors = []; // aca metemos elementos x cada tipo de error
    if(!username){
        errors.push({text: "Please, fill the username"});
    }
    if (!historia){
        errors.push({text: 'Por favor, rellena la historia'});
    }
    if (!fisico){
        errors.push({text: 'Rellena la descripción fisica del personaje por favor'})
    }
    if (!psicologia){
        errors.push({text: 'Rellena la descripción psicologica del personaje por favor'})
    }
    if (errors.length > 0){ // si hay errores mostrame este cb
        res.render('/files/add', {
            errors,
            username,
            fisico,
            psicologia,
            historia
        });
    }else {
        const newFile = new File({username, historia, fisico, psicologia,
            edad, empleo, grupo, raza, nacionalidad, orientacion, fuerza,
            destreza, resistencia, inteligencia, percepcion, agilidad, pb});
        await newFile.save();
        // req.flash('success_msg', 'File added succefully');
        res.redirect('/files')
    }
});

router.get('/files/edit/:id', async (req, res) => {
    const file = await File.findById(req.params.id);
    res.render('files/edit-file', {file});
});

router.put('/files/edit/:id', async (req, res) => {
    const {username, historia, fisico, psicologia,
        edad, empleo, grupo, raza, nacionalidad, orientacion, fuerza,
        destreza, resistencia, inteligencia, percepcion, agilidad, pb} = req.body;
    await File.findByIdAndUpdate(req.params.id, {username, historia, fisico, psicologia,
        edad, empleo, grupo, raza, nacionalidad, orientacion, fuerza,
        destreza, resistencia, inteligencia, percepcion, agilidad, pb});
    res.redirect('/files');
});


router.delete('/notes/delete/:id', async (req, res) => {
   await File.findByIdAndDelete(req.params.id);
   res.redirect('/notes');
});


module.exports = router;
