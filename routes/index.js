const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const user = require('./modules/user')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/', authenticatedAdmin, admin)
router.use('/users', user)

router.get('/dashbord', authenticated, (req, res) => res.render('dashboard'))

router.get('/', (req, res) => res.redirect('/dashboard'))
router.use('/', generalErrorHandler)

module.exports = router
