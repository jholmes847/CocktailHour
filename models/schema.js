const mongoose = require('mongoose')

const drinkSchema = new mongoose.Schema ({
  name:String,
  category:String,
  description: String,
  image: String,
  rating: Number,
  
})

const drinkCollection = mongoose.model('Drink', drinkSchema)
module.exports = drinkCollection