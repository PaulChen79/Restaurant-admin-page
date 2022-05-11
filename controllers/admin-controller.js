const db = require('../models')
const User = db.User
const adminController = {
  getAdminHomePage: (req, res) => {
    res.render('admin/dashboard')
  },
  getUsersPage: (req, res, next) => {
    User.findAll({ raw: true }).then(users => {
      res.render('admin/users', { users })
    })
  },
  getAddUserPage: (req, res, next) => {
    res.render('admin/addUser')
  }
}

module.exports = adminController
