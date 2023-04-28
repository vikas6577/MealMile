const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/fooddata', async (req, res) => {
  try {
    const foodData = mongoose.connection.db.collection('foodData');
    const foodCategory=mongoose.connection.db.collection('foodCategory')
    const data = await foodData.find({}).toArray();
    const categorydata=await foodCategory.find({}).toArray();
    // console.log(data,categorydata);
    res.send({data,categorydata});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
    
  }
});

module.exports = router;
