const mongoose = require("mongoose");

const instaSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
  },
  {
    versionKey: false,
  }
);

const InstaModel = mongoose.model("post", instaSchema);

module.exports = {
    InstaModel,
};
