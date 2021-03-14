const express = require('express')

const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
const formateMongooseDate = require('../../formateMongooseDate.js')
const isValidDate = require('../../isValidDate.js')

const router = express.Router()

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const categories = []
  Category.find()
    .lean()
    .then(items => {
      categories.push(...items)
      Record.findOne({ _id, userId })
        .lean()
        .then(record => {
          record.date = formateMongooseDate(record.date, '-')
          res.render('edit', { categories, record })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const { name, date, category, merchant, amount } = req.body

  if (!isValidDate(date)) {
    req.flash('warning_msg', '不存在的日期，或日期格式不正確。正確的日期格式為 YYYY-MM-DD，西元年第一個數字須為 1 或 2。')
    return res.redirect('/records/new')
  }

  Record.create({
    name: name,
    date: date,
    category: category,
    merchant: merchant,
    amount: amount,
    userId: req.user._id
  })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, date, category, merchant, amount } = req.body

  if (!isValidDate(date)) {
    req.flash('warning_msg', '不存在的日期，或日期格式不正確。正確的日期格式為 YYYY-MM-DD，西元年第一個數字須為 1 或 2。')
    return res.redirect(`/records/${_id}/edit`)
  }

  Record.findOne({ _id, userId })
    .then((record) => {
      record.name = name
      record.date = date
      record.category = category
      record.merchant = merchant
      record.amount = amount
      record.save()
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => {
      record.remove()
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

module.exports = router