const router = require('express').Router()
const jsforce = require('jsforce')
const jwtflow = require('salesforce-jwt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const clientId = process.env.SF_CLIENT_ID
const certPath = __dirname + '/../certificates/'
const privateKey = fs.readFileSync(certPath + 'server.key', 'utf-8')
const authToken = fs.readFileSync(certPath + 'auth.txt', 'utf-8')
const instanceUrl = process.env.SF_INSTANCE_URL
const user = process.env.SF_USER
const User = require('../models/User')

jwtflow.getToken(clientId, privateKey, user, (err, accessToken) => {
   if (err) return console.log(err)
   fs.writeFileSync(certPath + 'auth.txt', accessToken);
})

router.get('/Blog_Post__c', async function(req, res) {
   const conn = new jsforce.Connection();
   conn.initialize({
       instanceUrl: instanceUrl,
       accessToken: authToken
   });
   const results = await conn.query("SELECT Id, Name, Subject__c, Body__c, Created_By_Name__c, CreatedDate FROM Blog_Post__c ORDER BY CreatedDate DESC")
   res.json(results)
})

router.get('/Blog_Post__c/:id', async function(req, res) {
   const conn = new jsforce.Connection();
   try {
      conn.initialize({
         instanceUrl: instanceUrl,
         accessToken: authToken
     });
     const results = await conn.sobject('Blog_Post__c').retrieve(req.params.id)
     return res.json(results)
   } catch(err) {
      console.log(err)
      return res.status(400).send({message: err})
   }
})

router.get('/Blog_Comment__c/:postId', async function(req, res) {
   const conn = new jsforce.Connection();
   try {
      conn.initialize({
         instanceUrl: instanceUrl,
         accessToken: authToken
     });
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
   const conn = new jsforce.Connection();
   try {
      conn.initialize({
         instanceUrl: instanceUrl,
         accessToken: authToken
     });
     await conn.sobject('Blog_Comment__c').find({ Id: req.params.commentId }).update({ Visibility__c: 'deleted'})
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
   const conn = new jsforce.Connection();
   try {
      conn.initialize({
         instanceUrl: instanceUrl,
         accessToken: authToken
     });
     const comment = {Blog_Post__c: req.body.post, Body__c: req.body.comment, User__r: {External_Id__c: user._id}}
     const result = await conn.sobject("Blog_Comment__c").create(comment)
     return res.json(comment)
   } catch(err) {
      console.log(err)
      return res.status(400).send({message: err.message})
   }
})

module.exports = router







