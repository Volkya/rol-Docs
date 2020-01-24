const express = require('express');
const router = express.Router();
// Models
const User = require('../models/user');

// LOGIN
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});
router.post('/users/signin', (req, res) => {
    res.send('login enviado');
});

// REGISTER
router.get('/users/signup', (req, res) => {
    res.render('users/signup', {title: 'Sign up'});
});
router.post('/users/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({username, email, password});
    await newUser.save();
    res.send('registro enviado');
});

module.exports = router;
