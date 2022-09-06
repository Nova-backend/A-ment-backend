const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const express = require('express')
const app = express()
// const server = http.createServer(app)
const mongoose = require('mongoose')
const router = require('./routes/user.js')

mongoose.connect(process.env.URL).then(()=>{
    console.log("Database successfully connected");
})




const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/auth",router)

app.listen(PORT, ()=>{
    console.log(`The server is learning on port ${PORT}`)
})

