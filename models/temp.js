const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
      Ad1: String,
      Ad2: String,
      _city: String,
      _state: String,
      pincode: Number,
      mobileNum: Number,

})
const WishListSchema = new mongoose.Schema({
      _idu:String,
      WL:Array,
})
const OrderHistorySchema = new mongoose.Schema({
      _idu:String,
      WL:Array,
})
const BrowseHistorySchema = new mongoose.Schema({
      _idu:String,
      WL:Array,
})
const CartSchema= new mongoose.Schema({
      cartitem: Array,
      quantity: Number,
      price: Number,
})