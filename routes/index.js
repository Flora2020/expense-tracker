const express = require('express')

const home = require('./modules/home.js')
const records = require('./modules/records.js')
const users = require('./modules/users.js')
const auth = require('./modules/auth.js')

const { authenticator } = require('../middleware/authenticate.js')

const router = express.Router()

router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router