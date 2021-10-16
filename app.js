const express =require('express')
const mongoose = require('mongoose')
const path = require("path");
require('dotenv').config()
const url=process.env.URL;
const app = express()
var cors = require('cors')


mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true ,useCreateIndex:true})
.then(()=>{console.log('Mongo Atlas connected....')})
.catch((e)=> {console.log('Error inmongo Atlas connection' ,e)});  
// const con =mongoose.connection
// con.on('open',()=>{console.log('Mongo connected....')})
     
//to add static website
// console.log(path.join(__dirname,"../public"))
// const static_path =path.join(__dirname,"../public")
// app.use(express.static(static_path))
app.use(express.json())
app.use(cors())

app.use(express.urlencoded({extended:false}))


const usersRouter = require('./routes/users.js');
app.use('/user',usersRouter);
const itemRoute = require('./routes/items');
app.use('/item',itemRoute)




const PORT= process.env.PORT || 9000;
app.listen(9000,()=>{
      console.log("Server listening...")
})