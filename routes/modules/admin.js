const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer')

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

router.get('/categories', adminController.getCategoriesPage)
router.get('/addCategory', adminController.getAddCategoryPage)
router.post('/categories', adminController.addCategory)
router.get('/categories/:id/edit', adminController.getEditCategoryPage)
router.patch('/categories/:id', adminController.updateCategory)
router.delete('/categories/:id', adminController.deleteCategory)
router.get('/categories/search', adminController.searchCategory)

router.get('/products', adminController.getProductsPage)
router.get('/addProduct', adminController.getAddProductPage)
router.post('/products', upload.single('image'), adminController.addProduct)
router.get('/products/:id/edit', adminController.getEditProductPage)
router.patch('/products/:id', upload.single('image'), adminController.updateProduct)
router.delete('/products/:id', adminController.deleteProduct)
router.get('/products/search', adminController.searchProduct)

module.exports = router
