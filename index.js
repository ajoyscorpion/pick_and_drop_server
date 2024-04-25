
require('dotenv').config()
require('./db/connection')

const express = require('express')

const cors = require('cors')

const router = require('./routes/router')

const server = express()

const PORT = 4000 || process.env.PORT

server.use(cors())
server.use(express.json())
server.use(router)

server.get('/',(req,res)=>{
    res.send("Pick and Drop Server Started")
})

server.listen(PORT,()=>{
    console.log(`Pick and Drop Server started in ${PORT}`);
})

