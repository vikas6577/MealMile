const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

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
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
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

router.post("/loginuser",
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
    if (!req.body.password === userdata.password) {
      return res
        .status(400)
        .json({ errors: "Try logging with correct credentials" });
    }
    return res.json({ success: true });
  } catch(error){
    res.json({success:false})
  }
});

module.exports = router;
