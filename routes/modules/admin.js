const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/', adminController.getAdminHomePage)
router.get('/users', adminController.getUsersPage)

module.exports = router
