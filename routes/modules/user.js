const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')
const userController = require('../../controllers/user-controller')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users.login',
  failureFlash: true
}), userController.Login)

router.get('/register', userController.getRegisterPage)

router.post('/register', )

module.exports = router
