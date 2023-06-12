const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, password, email, gender, age, city, is_married } = req.body;
  const oldUser = await UserModel.findOne({ email });
  if (oldUser) {
    res.status(200).json({ msg: "User already exist, please login" });
  }
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(200).json({ msg: err.message });
      } else {
        const user = new UserModel({
          name,
          password: hash,
          email,
          gender,
          age,
          city,
          is_married,
        });
        await user.save();
        res.status(200).json({ msg: "user has been registered" });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user._id, user: user.name }, "masai");
          res.status(200).json({ msg: "login successful", token });
        } else {
          res.status(200).json({ msg: "wrong credentials" });
        }
      });
    } else {
      res.status(200).json({ msg: "user does not exist" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.messageF });
  }
});

module.exports = {
  userRouter,
};
