const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)