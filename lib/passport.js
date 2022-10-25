const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../db/models')

const authenticate = async (username, password, done) => { 
    try { 
        // call the method of authenticate from the User Models
        const user = await User.authenticate({username, password});
        return done(null, user);
    } catch(err) { 
        // this code below will be thrown into flash
        return done(null, false, { message: err.message })
    }
}

passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticate)
);

// in the below code is to create the user session
passport.serializeUser(
    (user, done) => done(null, user.id)
)

passport.deserializeUser(
    async (id, done) => done(null, await User.findByPk(id))
)

module.exports = passport
