const express = require('express')

const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
const formateMongooseDate = require('../../formateMongooseDate.js')
const generateIconHTML = require('../../generateIconHTML.js')

const router = express.Router()

router.get('/', (req, res) => {
  const searchedCategory = req.query.category || ''
  const filter = {}
  let totalAmount = 0
  if (searchedCategory) {
    filter.category = searchedCategory
  }
  const categories = []
  Category.find()
    .lean()
    .then((items) => {
      categories.push(...items)

      Record.find(filter)
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          records.forEach(record => {
            totalAmount += Number(record.amount)
            record.amount = record.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            record.date = formateMongooseDate(record.date, '/')
            record.iconHTML = generateIconHTML(record.category)
          })
          totalAmount = totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          res.render('index', { categories, records, totalAmount, searchedCategory })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router