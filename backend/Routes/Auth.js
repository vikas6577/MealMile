const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const jwtSecret="Mynameisfoodorderingapp"
router.post(
  "/createuser",
  body("password", "Length should be minimum 5").isLength({ min: 5 }),
  body("email", "Should be a Valid Email").isEmail(),
  body("name", "Minimum Length need to be 5").isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    let securepass=await bcrypt.hash(req.body.password,salt);
    try {
      await User.create({
        name: req.body.name,
        password: securepass,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  body("password", "Length should be minimum 5").isLength({ min: 5 }),
  body("email", "Should be a Valid Email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      const pwdCompare=await bcrypt.compare(req.body.password,userdata.password)
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      const data={
        user:{
          id:userdata.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret)
      // console.log(userdata);
      return res.json({ success: true,authToken:authToken});
    } catch (error) {
      return res.json({ success: false });
    }
  }
);

module.exports = router;
