const videoData = require("../videodata/video-data");

const { Video } = require("../models/video-model");

async function sendDataToDb(){
  try{
    videoData.forEach(async(video)=>{
      const newVideo = new Video(video)
      const saveVideo = await newVideo.save();
       console.log("Videos Saved to db...")
    })
   
  }catch{
    console.log("Videos not Saved to db...")
  }
}

module.exports = { sendDataToDb }