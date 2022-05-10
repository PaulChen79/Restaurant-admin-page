const User = require('../models/user')
const bcrypt = require('bcryptjs')
const userController = {
  getLoginPage: (req, res) => {
    res.render('login')
  }
}

module.exports = userController
