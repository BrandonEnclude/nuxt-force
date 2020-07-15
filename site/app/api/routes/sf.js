const router = require('express').Router()
const SfConnection = require('../SfConnection')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const clientId = process.env.SF_CLIENT_ID
const certPath = __dirname + '/../certificates/'
const privateKey = fs.readFileSync(certPath + 'server.key').toString('utf8')
const instanceUrl = process.env.SF_INSTANCE_URL
const sfUser = process.env.SF_USER
const User = require('../models/User')

const sf = new SfConnection(clientId, privateKey, instanceUrl, sfUser)

router.get('/Blog_Post__c', async function(req, res) {
   try {
      const conn = await sf.connect()
      const results = await conn.query("SELECT Id, Name, Subject__c, Body__c, Created_By_Name__c, CreatedDate FROM Blog_Post__c ORDER BY CreatedDate DESC")
      return res.json(results)
   } catch (err) {
      console.log(err)
      return res.status(400).send({message: err.message}) 
   }
})

router.get('/Blog_Post__c/:id', async function(req, res) {
   try {
      const conn = await sf.connect()
      const results = await conn.sobject('Blog_Post__c').retrieve(req.params.id)
      return res.json(results)
   } catch(err) {
      return res.status(400).send({message: err.message})
   }
})

router.get('/Blog_Comment__c/:postId', async function(req, res) {
   try {
      const conn = await sf.connect()
      const results = await conn.sobject('Blog_Comment__c').find({Blog_Post__c: req.params.postId, Visibility__c: 'Visible'}).sort({ CreatedDate: -1})
      return res.json(results)
   } catch(err) {
      console.log(err)
      return res.status(400).send({message: err.message})
   }
})

router.delete('/Blog_Comment__c/:commentId', async function(req, res) {
   var decoded
   try {
      const token = req.headers.authorization.split(' ')[1]
      decoded = jwt.verify(token, process.env.TOKEN_SECRET)
   } catch(err) {
      return res.status(401).send('Unauthorized')
   }
   try {
      const conn = await sf.connect()
      await conn.sobject('Blog_Comment__c').find({ Id: req.params.commentId, User__r: {External_Id__c: decoded._id} }).update({ Visibility__c: 'deleted'})
      return res.status(200).send('Ok')
   } catch(err) {
      console.log(err)
      return res.status(400).send({message: err.message})
   }
})

router.post('/Blog_Comment__c', async function(req, res) {
   var user;
   try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
      user = await User.findOne({_id: decoded._id})
   } catch(err) {
      return res.status(401).send('Unauthorized')
   }
   try {
      const conn = await sf.connect()
      const comment = {Blog_Post__c: req.body.post, Body__c: req.body.comment, User__r: {External_Id__c: user._id}}
      const result = await conn.sobject("Blog_Comment__c").create(comment)
     return res.json(comment)
   } catch(err) {
      console.log(err)
      return res.status(400).send({message: err.message})
   }
})

module.exports = router