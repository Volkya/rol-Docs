const express = require('express');
const router = express.Router();
// Models
const User = require('../models/user');
const passport = require('passport');

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
    const errors = [];
    // console.log(req.body);
    const { username, email, password, confirm_password } = req.body;
    if (password != confirm_password){
        errors.push({text: "Password dont match"});
    }
    if (password.length < 4){
        errors.push({text: "Password must be at least 4 characters"});
    }
    if (errors.length > 0 ){
        res.render('users/signup', {errors, username, email, password, confirm_password});
    }
    else {
        emailUser = await User.findOne({email: email});
        if (emailUser){
            req.flash('error_msg', 'The mail is already in use');
            res.redirect('/users/signup');
        }
        const newUser = new User({username, email, password, confirm_password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'U r registred');
        res.redirect('/users/signin');
    }
});

module.exports = router;
