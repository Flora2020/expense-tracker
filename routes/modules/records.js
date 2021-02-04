const express = require('express')

const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
const formateMongooseDate = require('../../formateMongooseDate.js')

const router = express.Router()

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const categories = []
  Category.find()
    .lean()
    .then(items => {
      categories.push(...items)
      Record.findById(id)
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
  const { name, date, category, amount } = req.body
  Record.create({
    name: name,
    date: date,
    category: category,
    amount: amount
  })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  Record.findById(id)
    .then((record) => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.save()
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => {
      record.remove()
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

module.exports = router