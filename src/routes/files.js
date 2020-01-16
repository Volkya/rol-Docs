const express = require('express');
const router = express.Router();
const File = require('../routes/files');

router.get('/add' , (req, res) => {
    res.render('files/new-file', {title: 'New file'});
});

router.get('/edit', (req, res) => {
   res.render('files/edit-file');
});

router.get('/all', (req, res) => {
    res.render('files/all-files');
});

module.exports = router;
