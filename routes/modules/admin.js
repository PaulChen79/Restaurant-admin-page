const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/', adminController.getAdminHomePage)

router.get('/users', adminController.getUsersPage)
router.get('/addUser', adminController.getAddUserPage)
router.get('/users/:id/edit', adminController.getEditUserPage)
router.patch('/users/:id', adminController.updateUser)
router.delete('/users/:id', adminController.deleteUser)
router.get('/users/search', adminController.searchUser)

router.get('/groups', adminController.getGroupsPage)
router.get('/addGroup', adminController.getAddGroupPage)
router.post('/groups', adminController.addGroup)
router.get('/groups/:id/edit', adminController.getEditGroupPage)
router.patch('/groups/:id', adminController.updateGroup)
router.delete('/groups/:id', adminController.deleteGroup)
router.get('/groups/search', adminController.searchGroup)

router.get('/tables', adminController.getTablesPage)
router.get('/addTable', adminController.getAddTablePage)
router.post('/tables', adminController.addTable)
router.get('/tables/:id/edit', adminController.getEditTablePage)
router.patch('/tables/:id', adminController.updateTable)
router.delete('/tables/:id', adminController.deleteTable)
router.get('/tables/search', adminController.searchTable)

module.exports = router
