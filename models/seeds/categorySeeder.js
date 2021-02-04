const Category = require('../category.js')
const categories = require('./categories.js')

const db = require('../../config/mongoose.js')

db.once('open', () => {
  Category.insertMany(categories)
    .then(() => {
      console.log('categories done!')
      db.close()
    })
})