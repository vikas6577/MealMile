const express = require('express')
const mongoose=require('mongoose')
const connectToMongo=require('./db')
connectToMongo();
const app = express()
const cors = require("cors");
app.use(cors());
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api',require("./Routes/Auth"));
app.use('/api',require("./Routes/DisplayData"));

app.listen(port,function (err) {
  if(err) console.log("Error in server setup");
  console.log(`Example app listening on port ${port}`)
})

