const mongoose = require("mongoose");

const {Schema} = mongoose;

const videoSchema = new Schema({
  url:String,
  name:String,
  artist:String,
  genre:String,
  views:String,
  image:String,
  thumbnail:String,
})

const Video = mongoose.model("Video", videoSchema)

module.exports = { Video };