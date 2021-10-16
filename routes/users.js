const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bodyParser= require("body-parser")
// const { urlencoded } = require('body-parser')
// const { addListener } = require('../models/user')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
      try {
            const users = await User.find()
            res.json(users)

      } catch (err) {
            res.send("Error occured" + err)

      }
})


router.get('/:id', async (req, res) => {
      try {
            const user = await User.findById(req.params.id)
            res.json(user)

      } catch (err) {
            res.send("Error occured" + err)

      }
})


router.post('/register', async (req, res) => {
      console.log(req.body)
      const {name,email,phone,pass,cpass} =req.body
      
      try {
            const userexist = await User.findOne({email:email});
            if(userexist){
                  return res.status(404).json({erroe:"This Email is already registered. "})
            }else if (pass != cpass){
                  return res.status(404).json({error:"Passwords do not match "})
              
            }else{
                const user = new User({name,email,phone,pass,cpass})
                console.log(user)
            await user.save()
            res.status(200).json(user)
            
      }} catch (err) {
            res.send("error happend" +err)
            
      }
})

router.post('/login', async (req, res) => {
      console.log("SEvER",req.body)
      const {Lemail,Lpass}= req.body;
      console.log("LLLLSER",Lpass)
      if (!Lemail || !Lpass){
            return res.status(422).json({error :"Plz fill all fields properly"})
      console.log("LLLLSER some not found")

      }
      try {
            const Cuser = await User.findOne({email:Lemail});
              
            if(!Cuser){
                  return res.status(422).json({erroe:"This Email is not registered. "})
            }
            else if (Cuser.pass != Lpass){
      // console.log("LLLLSER",Lpass===Cuser.pass)

                  console.log("FULLLLL USer,paas not match",Cuser)
                  return res.status(422).json({erroe:"Incorrect Password. "})}
            else if(Cuser.pass===Lpass){
                  res.status(201).json(Cuser)
                  console.log(Lpass)
            }   
            
           
            
      } catch (err) {
            res.send("error happend" +err)
            
      }
})


router.patch('/:id',async(req,res) =>{
      // console.log("reqparams",req.params)
      console.log("reqbody",req.body)

      try {  
           const user = await User.find({_id: req.body._uid})
            // console.log("AADING BROWSER IN PATCH SERVER",user)
            function checkAdult(i) {
                  return i ===req.body.browseHistory;
                }
            console.log("NMAe ",user[0].name)
            console.log( user[0].name )
            var x=( user[0].browseHistory.find(checkAdult))

           
            if(!x){
                  user[0].browseHistory.push(req.body.browseHistory) 
            }
            else{
                console.log("alredy exist")
            }
           
            const u1 = await user[0].save()
            res.json(u1)
           
            

           
      } catch (err) {
            res.send('error :::::'+ err)
            
      }
})
router.patch('/:id/wishlist',async(req,res) =>{
      try{
      const user = await User.find({_id: req.body._uid})
      // console.log("AADING BROWSER IN PATCH SERVER",user)
      function check(i) {
            return i ===req.body.wishlist;
          }
      console.log("WISH NMAe ",user[0].name)
      console.log( "WIsh of USER ",user[0] )
      var x=( user[0].wishlist.find(check))

      
      if(!x){
            user[0].wishlist.push(req.body.wishlist) 
      }
      else{
          console.log("alredy exist")
      }
     
      const u1 = await user[0].save()
      res.json(u1)}
      catch(err) {
            res.send('error :::::'+ err)
            
      }
}

)
 
router.patch('/:id/addtocart',async(req,res) =>{
      console.log(req.body)
      try{
      const user = await User.find({_id: req.body._uid})
      console.log("UUUSERCART",user)
      user[0].cart = req.body.iitem
      console.log(user[0].cart)
      res.json(user[0])


      }catch(err) {
            res.send('error :::::'+ err)
            
      }

      

})



router.delete('/:id',async(req,res) =>{
      try {
            const user = await User.findById(req.body.id)
            user.name = req.body.sub
            const u1 = await user.remove()
            res.json(u1)
      } catch (err) {
            res.send('error '+ err)
            
      }
})

module.exports = router