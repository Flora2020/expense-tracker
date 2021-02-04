const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const router = require('./routes/index.js')
require('./config/mongoose.js')

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(router)

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})