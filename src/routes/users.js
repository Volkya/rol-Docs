const express = require('express');
const router = express.Router();
// Models
const User = require('../models/user');
const passport = require('passport');

// LOGIN
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/files',
    failureRedirect: '/users/signin',
    failureFlash: true  // para los mensajes flash
}));

// REGISTER
router.get('/users/signup', (req, res) => {
    res.render('users/signup', {title: 'Sign up'});
});
router.post('/users/signup', async (req, res) => {
    const errors = [];
    const { username, email, password, confirm_password } = req.body;
    if (password !== confirm_password){
        errors.push({text: "Password dont match"});
    }
    if (password.length < 4){
        errors.push({text: "Password must be at least 4 characters"});
    }
    if (errors.length > 0 ){
        res.render('users/signup', {errors, username, email, password, confirm_password});
    }
    else {
        emailUser = await User.findOne({email: email}); // mail match
        if (emailUser){
            req.flash('error_msg', 'The mail is already in use');
            res.redirect('/users/signup');
        }else {
            const newUser = new User({username, email, password, confirm_password});
            newUser.password = await newUser.encryptPassword(password); // compare encrypt pass with classic pass inserted
            await newUser.save(); // save object User
            req.flash('success_msg', 'U r registred, now login pls'); // variable sended, user saved
            res.redirect('/users/signin');
        } // vsio ok, save pls
    } // end email coincidence
}); // other conditions verify

// success_msg, error_msg, text from errors

module.exports = router;
