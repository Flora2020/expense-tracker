const mongoose = require('mongoose')
const Category = require('../category.js')
const categories = require('./categories.js')

mongoose.connect('mongodb://localhost:27017/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongpdb connected!')
  categories.forEach(category => {
    Category.create(category)
  })
  console.log('categories done!')
})