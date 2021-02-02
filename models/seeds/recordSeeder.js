const mongoose = require('mongoose')
const Record = require('../record.js')
const records = require('./records.js')

mongoose.connect('mongodb://localhost:27017/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongpdb connected!')
  records.forEach(record => {
    Record.create(record)
  })
  console.log('records done!')
})