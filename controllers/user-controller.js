const User = require('../models/user')
const bcrypt = require('bcryptjs')

const userController = {
  getLoginPage: (req, res) => {
    res.render('login')
  },
  Login: (req, res) => {
    req.flash('success_messages', 'You have logged in!')
    res.redirect('/dashboard')
  },
  getRegisterPage: (req, res) => {
    res.render('register')
  }
}

module.exports = userController
