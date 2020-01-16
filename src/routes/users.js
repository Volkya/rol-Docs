const express = require('express');
const router = express.Router();
// Models
const User = require('../models/user');

router.get('/signin', (req, res) => {
    res.render('users/signin');
});


router.get('/signup', (req, res) => {
    res.render('users/signup', {title: 'Sign up'});
});

module.exports = router;
