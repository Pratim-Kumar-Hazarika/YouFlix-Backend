const express = require("express");
const router = express.Router();

const VideoController = require("../controllers/video");

router.route("/").get(VideoController.get_all_videos);

router.param("videoId",VideoController.video_param );

router.route("/:videoId").get(VideoController.get_single_video);

module.exports = router;