const mongoose = require('mongoose')

const drinkSchema = new mongoose.Schema ({
  name:String,
  origin:String,
  about: String,
  image: String,
  rating: Number,
  
})

const drinkCollection = mongoose.model('Drink', drinkSchema)
module.exports = drinkCollection