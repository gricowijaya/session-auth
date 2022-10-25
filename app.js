require('dotenv').config()
const express = require('express'); const app = express();
const session = require('express-session');
const flash = require('express-flash');
const passport = require('./lib/passport'); // passport settings library
const router = require('./routes/index')

const {
    PORT
} = process.env

// body parser should be on top before everything else
app.use(express.urlencoded({extended: false}));

// this is session handlers 
app.use(session({
    secret: 'This is a secret', 
    resave: false,
    saveUninitialized: false
}));

// must be before the router and view engine 
app.use(passport.initialize());
app.use(passport.session());

// set flash
app.use(flash());

// set the view engine with ejs
app.set('view engine', 'ejs');

// set the router  
app.use(router);
app.listen(PORT, () => { console.log(`running at port ${PORT}`) });


