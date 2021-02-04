const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

require('./config/mongoose.js')

const Category = require('./models/category.js')
const Record = require('./models/record.js')
const formateMongooseDate = require('./formateMongooseDate.js')
const generateIconHTML = require('./generateIconHTML.js')

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/records', (req, res) => {
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
        .then(records => {
          records.forEach(record => {
            totalAmount += Number(record.amount)
            record.date = formateMongooseDate(record.date, '/')
            record.iconHTML = generateIconHTML(record.category)
          })
          res.render('index', { categories, records, totalAmount, searchedCategory })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

app.get('/records/:id/edit', (req, res) => {
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

app.post('/records/:id', (req, res) => {
  console.log('req.body:', req.body)
})

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})