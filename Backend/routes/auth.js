const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
var fetchuser = require('../middleware/fetchUser');
var JWT_SECRET = "Shubham@8536";

//ROUTE 1 --> // Create a User using POST "/api/auth". Doesn't require Login
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should be 8 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success =false;
    //if there are erros then this bunch of code specify return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether user with this email is exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "This Email is alaready Exist" });
      }

      /// genrating password hash
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      // Create a New User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
    //   console.log(authToken);
      success=true;
      res.json({success,authToken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server ERROR!!");
    }
  }
);

//ROUTE 2 --> // Authenticate a User using POST "/api/auth/login". Doesn't require Login
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
  ], async (req, res) => {
    let success = false;
    //if there are erros then this bunch of code speacify return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructuring
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "PLEASE  Use Correct Email or Password" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false ;
        return res.status(400).json({ success, error: "PLEASE  Use Correct Email or Password" });
  
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server ERROR!!");
  
    }
  })

//ROUTE 3 --> // Get LoggedIn User Detail using POST "/api/getUser". Require Login
router.post('/getUser', fetchuser, async (req, res) =>{ 
    try {
      userId =req.user.id;
      const user = await User.findById(userId).select("-password"); 
      res.send(user);
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server ERROR!!");
    }
    })
module.exports = router;
