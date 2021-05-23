const { User } = require("../models/user-model");
const {extend} = require("lodash")

exports.extract_user_param = async(req,res,next,userId)=>{
  try{
    const user = await User.findById(userId)
    if(!user){
      return res.status(400).json({succes:false, message:"User doesn't exist in the db.."})
    }
    req.user = user;
    next();
  }catch{
    res.status(400).json({sucess:false, message:"user doesn't exist in the db.."})
  }
}
exports.all_users = async(req,res)=>{
  try{
    const users = await User.find({});
    res.json({sucess:true,message:"Users coming from db...",totalUsers:users.length, allUsers:users})
  }catch(error){
    res.status(500).json({sucess:false,message:"Unable to get the users.."})
  }
}

exports.add_user = async(req,res)=>{
  try{
    const findUser = await User.find({email:req.body.email})
    if(findUser.length>=1){
      return res.status(400).json({sucess:false,message:"User exists in the db already"})
    }else{
        const user = req.body;
        const NewUser = new User(user)
        const saveUser = await NewUser.save()
        res.json({succes:true,message:"User saved to db..",saveUser})
    }
  }catch{
    res.status(500).json({sucess:false, message:"Unable to add user to the db.."})
  }
}

exports.one_user = async(req,res)=>{
  const {user} = req;
  res.json({sucess:true, message:"The user is..",user})
}
exports.delete_user = async(req,res)=>{
  const {user} = req;
  await user.remove()
  res.json({sucess:true, message:"User is being removed from the db.."})
}

exports.get_user_likedVideos =async(req,res)=>{
  const {userId} = req.params;
  const user = await User.findById(userId).select("likedVideos name")
  res.json({success:true,message:"User likedVideos are...",user})
}

exports.add_video_to_likedVideos = async(req,res)=>{
  try{
    const {userId} = req.params;
    const {_id} = req.body;
    let user = await User.findById(userId)
    const ifIdExists = user.likedVideos.find((item)=>item._id == _id)
    if(ifIdExists){
      return res.json({sucess:false, message:"video exists in likedVideos"})
    }
    const update = user.likedVideos.push(_id)
    user = extend(user,update)
    user = await user.save()
    res.json({sucess:true,message:"video added to likedVideos...",user})
  }catch{
    res.status(400).json({sucess:false, message:"unable to add the video to likedVideos.."})
  }
}

exports.delete_video_from_likedVideos =async(req,res)=>{
  try{
      const {userId } = req.params;
      const {_id} = req.body;
      const user = await User.findById(userId)
      user.likedVideos.remove(_id)
      await user.save()
 res.json({sucess:true, message:"video is deleted from wishlist"})
  }catch{
     res.status(500).json({sucess:false, message:"video is not deleted from likedVideos"})
  }
}

exports.get_user_historyVideos = async(req,res)=>{
  const {userId} = req.params;
  const {_id} = req.body;
  const user = await User.findById(userId).select("historyVideos name")
  res.json({sucess:true , message:"user history videos are....",user})
}
exports.add_to_historyVideos = async(req,res)=>{
  try{
    const {userId} = req.params
    const {_id} = req.body;
    let user = await User.findById(userId)
    const ifIdExists = user.historyVideos.find((item)=>item._id == _id)
    if(ifIdExists){
      return res.json({succes:true,message:"video already exist in the historyVideos"})
    }
    const update = user.historyVideos.push(_id)
    user = extend(user,update);
    user = await user.save();
    res.json({succes:true, message:"Video added to historyVideos", user})
  }catch{
    res.status(500).json({sucess:false, message:"unable to add video to the historyVideos"})
  }
}
exports.delete_video_from_historyVideos = async(req,res)=>{
  try{
      const {userId} = req.params;
      const {_id} = req.body;
      const user = await User.findById(userId);
      await user.historyVideos.remove(_id);
      await user.save()
      res.json({sucess:true, message:"video is removed from historyVideos"})
  }catch{
    res.status(500).json({succes:false,message:"video is not deleted from historyVideos..."})
  }
}

///PlAYLIST
exports.get_user_playlist =async(req,res)=>{
  const {userId} = req.params;
  const user = await User.findById(userId).select("playlists name")
  res.json({success:true,message:"The user playlist is..", user})
}

exports.add_playlist_to_user = async(req,res)=>{
  try{///ADD A PLAYLIST TO THE USER....
    const {userId} = req.params;
    const {name }= req.body;
    let user = await User.findById(userId).select("playlists name")
    const ifPlaylistNameExist = user.playlists.find(item =>item.name == name)
    if(ifPlaylistNameExist){
      return res.status(500).json({success:false, message:"the playlist exists...."})
    }
    let update = user.playlists.push({name:name,video:[]})
    user = extend(user,update)
    user = await user.save()
    res.json({success:true, user})
  }catch{
    res.status(500).json({success:false,message:"unable to add to the playlist of the user.."})
  }
}

exports.delete_playlist_from_user =async(req,res)=>{
   const {userId} = req.params;
    const {name} = req.body;
    await User.updateOne({"_id":userId},
    {"$pull":{"playlists":{"name":name}}})
    res.json({success:true,message:"playlist deleted.."})
}

exports.add_video_to_user_playlist = async(req,res)=>{
  try{
    const {userId} = req.params;
    const {name} = req.body;
    const {videoId} = req.body;
    await User.updateOne({ "_id": userId, "playlists.name": name }, { "$addToSet": { "playlists.$.video": videoId } });
    const user = await User.findById(userId).select("playlists name _id")
    res.json({success:true,user})
  }catch{
    res.status(500).json({success:false,message:"unable to add to the playlist"})
  }
}

exports.delete_video_from_user_playlist = async(req,res)=>{
    const {userId} = req.params;
    const {name} = req.body;
    const {videoId} = req.body;
    await User.updateOne({ "_id": userId, "playlists.name": name }, { "$pull": { "playlists.$.video": videoId } });
    res.json({success:true,message:"video deleted from playlist.."})
}