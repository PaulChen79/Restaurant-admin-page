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
    console.log(req.body)
    const { name, email, password, passwordCheck, groupId } = req.body
    if (password !== passwordCheck) throw new Error('Passwords do not match')
    return User.findOne({ where: { email } })
      .then(user => {
        if (user) throw new Error('Email already exist!')
        return bcrypt.genSalt(10)
      })
      .then(salt => bcrypt.hash(req.body.password, salt))
      .then(hash => User.create({
        name,
        email,
        groupId: groupId || 1,
        isAdmin: false,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', 'You have successfully registered!')
        res.redirect('/admin/users')
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
