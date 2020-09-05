const mongoose = require("mongoose")
const User = new mongoose.Schema({

  name: {
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  answers: [],
  score: Number

})

module.exports = mongoose.model('user', User)
