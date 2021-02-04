const Record = require('../record.js')
const records = require('./records.js')

const db = require('../../config/mongoose.js')

db.once('open', () => {
  Record.insertMany(records)
    .then(() => {
      console.log('records done!')
      db.close()
    })
})