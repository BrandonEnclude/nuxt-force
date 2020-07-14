const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

// Import Routes
const sfRoutes = require('./routes/sf')
const authRoutes = require('./routes/auth')

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true, },
    () => console.log('Connected to DB')
)

// // Middleware
app.use(bodyParser.json())

// Route Middleware
app.use('/sf', sfRoutes)
app.use('/auth', authRoutes)

module.exports = {
   path: '/api',
   handler: app
}