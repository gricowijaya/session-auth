module.exports = (req, res, next) => { 
    try { 
        // if user is authenticated then we can proceed to the next handler
        if (req.isAuthenticated()) return next()
        // if not authenticated just go to the login page
        res.redirect('/auth/login')
    } catch( err ) { 
        next(err)
    }
}
