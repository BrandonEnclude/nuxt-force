const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const {registerValidation, loginValidation} = require('../validation')
const sf = require('../sfConnection')

router.post('/register', async (req, res) => {
   // Validate data
   const {error} = registerValidation(req.body)
   if (error) return res.status(400).send(error)

   // Check for existing User
   const emailExists = await User.findOne({email: req.body.email})
   console.log(emailExists)
   if (emailExists) return res.status(400).send({message: `User ${req.body.email} already exists`})

   // Hash password
   const salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(req.body.password, salt)
   
   // Create user
   const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
   })
   var savedUser;
   try {
      savedUser = await user.save()
   } catch(err) {
      res.status(400).send(err)
   }
   try {
      const conn = await sf.getConnection()
      const response = await conn.sobject('Lead').create({ FirstName: savedUser.firstName, LastName : savedUser.lastName, Email: savedUser.email, External_Id__c: savedUser._id, Company: 'NuxtForce' })
      res.status(201).send({id: savedUser._id, firstName: savedUser.firstName, lastName: savedUser.lastName, email: savedUser.email, created: savedUser.created})
   } catch (err) {
      await User.deleteOne({_id: savedUser._id})
      res.status(400).send(err)
   }
   
})

router.post('/login', async (req, res) => {
   // Validate data
   const {error} = loginValidation(req.body)
   if (error) return res.status(400).send(error)

   // Check for existing User
   const user = await User.findOne({email: req.body.email})
   if (!user) return res.status(400).send({message: 'Incorrect email or password'})

   // Check password
   const validPass = await bcrypt.compare(req.body.password, user.password)
   if(!validPass) return res.status(400).send({message: 'Incorrect email or password'})

   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
   res.header('token', token)
   const body = {token: token}
   res.status(200).send(body)

})

router.get('/user', async (req, res) => {
   try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
      const user = await User.findOne({_id: decoded._id})
      res.status(200).send({user: user})
   } catch(err) {
      return res.status(401).send('Unauthorized')
   }
})

router.post('/logout', (req, res) => {
   return res.status(200).send('Logged out')
})

module.exports = router