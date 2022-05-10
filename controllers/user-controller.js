const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

const userController = {
  getLoginPage: (req, res) => {
    res.render('login')
  },
  Login: (req, res) => {
    req.flash('success_messages', 'You have logged in!')
    res.redirect('/restaurants')
  },
  getRegisterPage: (req, res) => {
    res.render('register')
  },
  register: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match')
    return User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email already exist!')
        return bcrypt.genSalt(10)
      })
      .then(salt => bcrypt.hash(req.body.password, salt))
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', 'You have successfully registered!')
        res.redirect('/users/login')
      })
      .catch(error => next(error))
  },
  logOut: (req, res) => {
    req.flash('success_messages', 'You have logged out!')
    req.logout()
    res.redirect('/users/login')
  }
}

module.exports = userController
