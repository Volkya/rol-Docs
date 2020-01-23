const express = require('express');
const router = express.Router();
// Models
const User = require('../models/user');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', (req, res) => {
    res.send('login enviado');
});


router.get('/users/signup', (req, res) => {
    res.render('users/signup', {title: 'Sign up'});
});

router.post('/users/signup', (req, res) => {
    res.send('registro enviado');
});

module.exports = router;
