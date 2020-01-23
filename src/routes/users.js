const express = require('express');
const router = express.Router();
// Models
const User = require('../models/user');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});


router.get('/users/signup', (req, res) => {
    res.render('users/signup', {title: 'Sign up'});
});

module.exports = router;
