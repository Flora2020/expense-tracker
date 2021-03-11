const express = require('express')

const home = require('./modules/home.js')
const records = require('./modules/records.js')
const users = require('./modules/users.js')

const router = express.Router()

router.use('/records', records)
router.use('/users', users)
router.use('/', home)

module.exports = router