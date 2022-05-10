const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models/')
const User = db.User
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) return done(null, false, req.flash('warning_messages', 'This email is not registered.'))
      return bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return done(null, false, req.flash('warning_messages', 'Password is incorrect.'))
        return done(null, user)
      })
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => {
      user = user.toJSON()
      done(null, user)
    })
    .catch(err => done(err))
})

module.exports = passport
