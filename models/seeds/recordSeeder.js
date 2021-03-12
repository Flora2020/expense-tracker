const Record = require('../record.js')
const records = require('./records.js')
const User = require('../user.js')
const userSeeds = require('./userSeeds')

const db = require('../../config/mongoose.js')
const record = require('../record.js')
const email = userSeeds[0].email
db.once('open', () => {
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log(`${email} is not registered! Can not create record seeds.`)
        process.exit()
      }
      records.forEach(record => record.userId = user._id)
      Record.insertMany(records)
        .then(() => {
          console.log('records done!')
          db.close()
        })
        .catch(error => {
          console.log(error)
          db.close()
        })
    })
})