const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const userSeeds = require('./userSeeds.js')
const User = require('../user.js')

db.once('open', () => {
  const promises = []
  for (let i = userSeeds.length - 1; i >= 0; i--) {
    promises.push(
      User.findOne({ email: userSeeds[i].email })
        .then(user => {
          if (user) {
            console.log(`${userSeeds[i].email} is already registered.`)
            return userSeeds.splice(i, 1)
          }
        })
    )
  }

  return Promise.all(promises)
    .then(() => {
      userSeeds.forEach(user => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
      })
      User.insertMany(userSeeds)
        .then(() => {
          console.log('user done!')
          process.exit()
        })
        .catch(error => {
          console.log(error)
          process.exit()
        })
    })
})