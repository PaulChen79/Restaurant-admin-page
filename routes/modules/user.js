const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')
const userController = require('../../controllers/user-controller')

router.get('/login', passport.authenticate('local', {
  failureRedirect: '/users.login',
  failureFlash: true
}), userController.getLoginPage)

module.exports = router
