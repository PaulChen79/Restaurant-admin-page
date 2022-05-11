const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/', adminController.getAdminHomePage)

router.get('/users', adminController.getUsersPage)
router.get('/addUser', adminController.getAddUserPage)
router.get('/users/:id/edit', adminController.getEditUserPage)
router.put('/users/:id', adminController.updateUser)
router.delete('/users/:id', adminController.deleteUser)
router.get('/users/search', adminController.searchUser)

router.get('/groups', adminController.getGroupsPage)
router.get('/addGroup', adminController.getAddGroupPage)
router.post('/groups', adminController.addGroup)

module.exports = router
