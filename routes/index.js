const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const user = require('./modules/user')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/admin', authenticatedAdmin, admin)
router.use('/users', user)

router.get('/restaurants', authenticated, (req, res) => res.render('index'))

router.get('/', (req, res) => res.redirect('/restaurants'))
router.use('/', generalErrorHandler)

module.exports = router
