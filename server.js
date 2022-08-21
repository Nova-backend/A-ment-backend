const dotenv = require('dotenv')
dotenv.config()
// const {Router} = require('./routes/user.js')
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const { Router } = require('./routes/user.js')

mongoose.connect(process.env.URL).then(()=>{
    console.log("Database successfully connected");
})


const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended: true}))
Router(app)

app.listen(PORT, ()=>{
    console.log(`The server is learning on port ${PORT}`)
})

