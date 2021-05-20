const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    name :{
    type:String,
    required:[true,"Name is needed man"]
  },
  email:{
    type:String,
    unique:true,
    required:true,
     validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email id!`
  }},
  password:{
    type:String,
    required:true
  },
  likedVideos :[ {type:Schema.Types.ObjectId, ref:"Video"}],
  historyVideos:[ {type:Schema.Types.ObjectId, ref:"Video"}],
  playlists:[
    {
      name:String,
      video:[{type:Schema.Types.ObjectId, ref:"Video"}]
    }
  ]
})

const User = mongoose.model("User",UserSchema);

module.exports = { User };