const { Swaggiffy } = require('swaggiffy'); // Using require


const dotenv = require('dotenv')
dotenv.config()

const fileupload = require("express-fileupload")

const express = require('express')

const bodyparser= require('body-parser');
const app = express()
// const server = http.createServer(app)
const mongoose = require('mongoose')
const router = require('./routes/user.js')
const manageappoint=require('./routes/requestAppointRoutes')

new Swaggiffy().setupExpress(app).swaggiffy();
const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');



mongoose.connect(process.env.URL).then(()=>{
    console.log("Database successfully connected");
})
const PORT = process.env.PORT
app.use(fileupload({useTempFiles:true}))
app.use(express.json())
app.use(bodyparser)
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use("/",router)
app.use("/api/manage",manageappoint)
app.listen(PORT, ()=>{
    console.log(`The server is learning on port ${PORT}`)
})

