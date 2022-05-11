const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/', adminController.getAdminHomePage)
router.get('/users', adminController.getUsersPage)
router.get('/addUser', adminController.getAddUserPage)
router.get('/users/:id', adminController.getEditUserPage)
router.put('/users/:id', adminController.updateUser)

module.exports = router
