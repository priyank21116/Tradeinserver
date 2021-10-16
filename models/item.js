const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  
      title:String,
      price:String,
      description:String,
      category:String,
      image:String,

})
const Itemcollec = mongoose.model('Items',itemSchema)
module.exports =Itemcollec