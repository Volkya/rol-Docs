const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// este archivo trae las funciones para los tipos de login, para mantener y deshacer la sesion, etc
const User = require('../models/user');

// metodo local con mail de login
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    // Match email user, form with schema
    const user = await User.findOne({email: email});
    if (!user){
        return done(null, false, {message: 'Not user found'});
    }else{
        // Match password user
        const match = await user.matchPassword(password);
        if (match){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect password'});
        }
    } // match password user
    }));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


// metodo con facebook login
