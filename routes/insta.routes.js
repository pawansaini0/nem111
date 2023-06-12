const express = require("express");
const { InstaModel } = require("../models/insta.model");
const { auth } = require("../middleware/auth.middleware");
const instaRouter = express.Router();

instaRouter.use(auth);

instaRouter.post("/add", async (req, res) => {
  try {
    const insta = new InstaModel(req.body);
    await insta.save();
    res.status(200).json({ msg: "new post has been created" });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

instaRouter.get("/", async (req, res) => {
  try {
    const posts = await InstaModel.find({ userID: req.body.userID });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

instaRouter.patch("/update/:postID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { postID } = req.params;
  try {
    const post = await InstaModel.findOne({ _id: postID });
    const userIDinPostDoc = post.userID;
    if (userIDinUserDoc === userIDinPostDoc) {
      await InstaModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.status(200).json({ msg: "post has been updated" });
    } else {
      res.status(200).json({ msg: "not authorized" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

instaRouter.delete("/delete/:postID",async(req,res)=>{
    const userIDinUserDoc = req.userID;
  const { postID } = req.params;
  try {
    const post = await InstaModel.findOne({ _id: postID });
    const userIDinPostDoc = post.userID;
    if (userIDinUserDoc === userIDinPostDoc) {
      await InstaModel.findByIdAndDelete({ _id: postID });
      res.status(200).json({ msg: "post has been updated" });
    } else {
      res.status(200).json({ msg: "not authorized" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

instaRouter.get("/logout", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    try {
      const gotToken = new TokenModel({ token });
      await gotToken.save();
      res.status(200).json({ msg: "User has been logged out" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });

module.exports = {
  instaRouter,
};
