const express = require('express');
const router = express.Router();
// ENTITY
const File = require('../models/file');
const fs = require('fs-extra');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'volktech',
    api_key: '356854687417533',
    api_secret: 'w7NjyZ4jxCYBGf8QAHuZmh_d9Uk'
});
// ALL OBJECTS
router.get('/files', async (req, res) => {
    // res.render('files/all-files');
    const files = await File.find().sort({date: 'desc'});
    res.render('files/all-files', {files});
});
// ADD FILE
router.get('/files/add' , (req, res) => {
    res.render('files/new-file');
});
router.post('/files/add', async (req, res) => {
    const { name, edad, pb, empleo, grupo, raza, nacionalidad, orientacion, psicologia, fisico, historia, fuerza, destreza, agilidad, resistencia, inteligencia, percepcion, created_at } = req.body; // con esto obtenemos los value del form
    const errors = []; // aca metemos elementos x cada tipo de error
    if(!name){
        errors.push({text: "Please, fill the name of your pj"});
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
            name,
            fisico,
            psicologia,
            historia
        });
    }else {
        const picUpdate = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'rolDocs'});
        const newFile = new File({name, historia, fisico, psicologia,
            edad, empleo, grupo, raza, nacionalidad, orientacion, fuerza,
            destreza, resistencia, inteligencia, percepcion, agilidad, pb, created_at, imageURL: picUpdate.url, public_id: picUpdate.public_id});
        await newFile.save();
        await fs.remove(req.file.path);
        req.flash('success_msg', 'File added succefully');
        res.redirect('/files');
        console.log(picUpdate);
    }
});
// EDIT FILE
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
// DELETE FILE
router.delete('/files/delete/:id', async (req, res) => {
   await File.findByIdAndDelete(req.params.id);
   res.redirect('/files');
});


module.exports = router;
