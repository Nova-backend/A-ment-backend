const dotenv = require('dotenv')
dotenv.config()
const formidable = require('formidable')
const cloudinary = require('cloudinary')
// const {Router} = require('./routes/user.js')
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const router = require('./routes/user.js')

mongoose.connect(process.env.URL).then(()=>{
    console.log("Database successfully connected");
})
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure:true
});

const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/auth",router)

app.listen(PORT, ()=>{
    console.log(`The server is learning on port ${PORT}`)
})

