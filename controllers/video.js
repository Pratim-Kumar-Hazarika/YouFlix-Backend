const { Video } = require("../models/video-model");

exports.video_param = async(req,res,next,videoId)=>{
  try{
    const video = await Video.findById(videoId);
    if(!video){
      return res.status(400).json({success:false,message:"Video not found.."})
    }
    req.video = video;
    next()
  }catch{
    res.status(400).json({success:false,message:"Coudn't retrieve the video.."})
  }
}

exports.get_all_videos = async(req,res)=>{
  try{
  const videos = await Video.find({});
  res.json({success:true, message:"Videos coming from database...", videos})
  }catch(error){
    res.status(500).json({success:false, message:"Videos Not Found.."})
  }
}


exports.get_single_video = (req,res)=>{
  const {video } = req;
  res.json({success:true, message:"Your video you wanted is ",video});
}