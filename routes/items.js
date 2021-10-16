const express = require('express')
const router = express.Router()
const Item = require('../models/item')
const bodyParser= require("body-parser")


const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
      try {
           
            const items = await Item.find()
            res.json(items)

      } catch (err) {
            res.send("Error occured1" + err)

      }
})


router.get('/:id', async (req, res) => {
      try { console.log(req.statusCode)
            const item = await Item.findById(req.params.id)
            res.json(item)

      } catch (err) {
            res.send("Error occured" + err)

      }
})


router.post('/', async (req, res) => {
      // req= JSON.parse(req)
      console.log(req)
      const item =  new Item({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image : req.body.image,
      })
      
      try { console.log(req.body)
            const it1 = await item.save()
            res.json(it1)
            
      } catch (err) {
            res.send("error happend:" +err)
            
      }
})


router.patch('/:id',async(req,res) =>{
      try {
            const user = await User.findById(req.params.id)
            user.name = req.body.name
            const u1 = await user.save()
            res.json(u1)
      } catch (err) {
            res.send('error '+ err)
            
      }
})


router.delete('/aa',async(req,res) =>{
      try {
            const item = await Item.find()
            const u1 = await Item.remove()
            res.json(u1)
      } catch (err) {
            res.send('error '+ err)
             
      }
})

router.delete('/:id',async(req,res) =>{
      try {
            const item = await Item.findById(req.params.id)
            const u1 = await item.remove()
            res.json(u1)
      } catch (err) {
            res.send('error '+ err)
            
      }
})

module.exports = router