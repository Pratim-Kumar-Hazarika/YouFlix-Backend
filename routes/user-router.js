const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user")

const { User } = require("../models/user-model");
const {extend} = require("lodash")

///All USERS
router.route("/")
.get(UserController.all_users)
.post(UserController.add_user)

/// USER PARAM
router.param("userId",UserController.extract_user_param)

/// SINGLE USER
router.route("/:userId")
.get(UserController.one_user)
.delete(UserController.delete_user)

///USER LIKED_VIDEOS
router.route("/:userId/likedVideos")
.get(UserController.get_user_likedVideos)
.post(UserController.add_video_to_likedVideos)
.delete(UserController.delete_video_from_likedVideos)

///USER HISTORY_VIDEOS
router.route("/:userId/historyVideos")
.get(UserController.get_user_historyVideos)
.post(UserController.add_to_historyVideos)
.delete(UserController.delete_video_from_historyVideos)

///USER PLAYLIST
router.route("/:userId/playlist")
.get(UserController.get_user_playlist )
.post(UserController.add_playlist_to_user)
.delete(UserController.delete_playlist_from_user)

///ADD VIDEO TO USER PLAYLIST
router.route("/:userId/playlist/videos")
.post(UserController.add_video_to_user_playlist)
.delete(UserController.delete_video_from_user_playlist)

module.exports = router;