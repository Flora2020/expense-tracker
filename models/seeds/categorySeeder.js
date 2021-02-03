const Category = require('../category.js')
const categories = require('./categories.js')

const db = require('../../config/mongoose.js')

db.once('open', () => {
  categories.forEach(category => {
    Category.create(category)
  })
  console.log('categories done!')
})