const Record = require('../record.js')
const records = require('./records.js')

const db = require('../../config/mongoose.js')

db.once('open', () => {
  records.forEach(record => {
    Record.create(record)
  })
  console.log('records done!')
})