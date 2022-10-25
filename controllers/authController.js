const { User } = require('../db/models');
const passport = require('../lib/passport')

module.exports = { 

    register: async (req, res) => {
        try { 
            // get only the username for checking the exists user 
            const { username } = req.body;

            const existUser = await User.findOne({ where: { username: username } });
            if (existUser) {
                return res.status(409).json({
                    status: false,
                    message: 'username already used!'
                });
            }

            await User.register(req.body)

            return res.redirect('/auth/login')
        } catch(err) { 
            next(err)
        }
    },

    // crete the passport login local strategy for creating the session
    login: passport.authenticate('local', {
        // successRedirect: '/', // redirect to index
        successRedirect: '/auth/whoami', // redirect to whoami
        failureRedirect: '/auth/login', // redirect to login again
        failureFlash: true
    }),


    // endpoint for checking the authenticated user
    whoami: (req, res, next) => { 
        try { 
            // req.user is from the User Model it is the authenticed User from passport
            res.render('profiles', req.user.dataValues)
        } catch(err) { 
            next(err)
        }
    }

}
