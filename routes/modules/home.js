const express = require('express')

const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
const { formateMongooseDate, daysOfMonth, isValidDate } = require('../../utils/dateUtil.js')
const { generateIcon } = require('../../utils/htmlUtil.js')

const router = express.Router()

router.get('/', (req, res) => {
  const selectedCategory = req.query.category || ''
  const selectedMonth = req.query.month || ''
  let year = req.query.year || new Date().getFullYear()
  const categories = []
  const monthOption = []
  const filter = { userId: req.user._id }
  let totalAmount = 0

  for (let i = 0; i < 12; i++) {
    monthOption.push({ month: `${i + 1}`, selectedMonth: selectedMonth })
  }

  if (selectedCategory) {
    filter.category = selectedCategory
  }

  if (selectedMonth) {
    const month = ('0' + selectedMonth).slice(-2)
    const date = `${year}-${month}-01`

    if (!isValidDate(date)) {
      req.flash('warning_msg', '西元年格式錯誤。正確格式：YYYY，第一個數字須為 1 或 2')
      return res.redirect('/')
    }

    filter.date = {
      $gte: new Date(date),
      $lt: new Date(`${year}-${month}-${daysOfMonth(year, month)}`)
    }
  } else {
    year = ''
  }

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
            record.iconHTML = generateIcon(record.category)
          })
          totalAmount = totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          res.render('index', { categories, monthOption, records, totalAmount, selectedCategory, year })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router