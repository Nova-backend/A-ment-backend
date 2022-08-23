const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(process.env.URL).then(()=>{
    console.log("Database successfully connected");
})


const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.listen(PORT, ()=>{
    console.log(`The server is learning on port ${PORT}`)
})

