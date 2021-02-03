const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Category = require('./models/category.js')
const Record = require('./models/record.js')

mongoose.connect('mongodb://localhost:27017/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongpdb connected!')
})

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/records', (req, res) => {
  const filter = {}
  let totalAmount = 0
  if (req.query.category) {
    filter.category = req.query.category
  }
  const categories = []
  Category.find()
    .lean()
    .then((items) => {
      categories.push(...items)

      Record.find(filter)
        .lean()
        .then(records => {
          records.forEach(record => {
            totalAmount += Number(record.amount)
          })
          res.render('index', { categories, records, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})