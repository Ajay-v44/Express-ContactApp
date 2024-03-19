const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validationToken = require("../middleware/validateTokenHandler");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({
        message: "Null values are not allowed",
      });
    } else {
      const userAvailable = await User.findOne({ email });
      if (userAvailable) {
        res.status(200).json({
          message: "User is already available",
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          username,
          email,
          password: hashPassword,
        });
        res.status(201).json({
          message: "User is created",
        });
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(400).json({
      message: errorMessage,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Null values are not allowed",
      });
    } else {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user.id,
            },
          },
          process.env.ACCESS_TOKEN_SCERET,
          { expiresIn: "15m" }
        );
        res.status(200).json({
          message: "Sccessfully logedin",
          token: accesstoken,
        });
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(400).json({
      message: errorMessage,
    });
  }
});

router.get("/current",validationToken, (req, res) => {
  res.json({ message: "curent  user",
data:req.user });
});

module.exports = router;
