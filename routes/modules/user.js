const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.get('/login', userController.getLoginPage)

module.exports = router