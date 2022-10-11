const dotenv = require('dotenv')
dotenv.config()
const fileupload = require("express-fileupload")
const express = require('express')
const app = express()
// const server = http.createServer(app)
const mongoose = require('mongoose')
const router = require('./routes/user.js')

const cookieParser = require('cookie-parser')


mongoose.connect(process.env.URL).then(()=>{
    console.log("Database successfully connected");
})
const PORT = process.env.PORT
app.use(fileupload({useTempFiles:true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use("/",router)
app.listen(PORT, ()=>{
    console.log(`The server is learning on port ${PORT}`)
})

