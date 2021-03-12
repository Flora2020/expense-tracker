const mongoose = require('mongoose')
const recordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)