const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
      name:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true,
            unique: true,
      },
      phone:{
            type:Number,
            required:true,
            unique: true,
      },
      pass:{
            type:String,
            required:true
      },
      confirmpass:{
            type:String,
            // required:true
      },
      address:{ type:Object,
            // required:true
      },
      orderHistory:{
            type:Array,
            // required:true
      },
      browseHistory: Array,
      cart:{
            type:Object,
            // required:true
      },
      pendingOrder:{
            type:Object,
      },
      wishlist:Array,
            // required:true
      

})
const UserCollec=mongoose.model('UserCollection',userSchema)
module.exports = UserCollec