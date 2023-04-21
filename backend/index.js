const express = require('express')
const mongoose=require('mongoose')
const connectToMongo=require('./db')
connectToMongo();

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port,function (err) {
  if(err) console.log("Error in server setup");
  console.log(`Example app listening on port ${port}`)
})

