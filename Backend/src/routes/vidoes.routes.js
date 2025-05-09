import { Router } from "express";
import { publishVideo , getallVidoes , getVideoAndChannelProfile , UpdateVideodetails, DeleteVideo , TogglePublishStatus, VideoUploadedByOwner } from "../controllers/videos.controlles.js";
import { upload } from "../middlewares/multer.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/").get(getallVidoes);

// Route to publish a video (POST request with file upload)
router.route("/upload").post( verifyjwt,
    upload.fields([
        { name: "VideoFile", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]),
    publishVideo // After the upload middleware, call the publishVideo function
);



router.route("/c/:VideoId/c/:ChannelId").get( verifyjwt, getVideoAndChannelProfile);
router.route("/update/c/:VideoId").patch(UpdateVideodetails);
router.route("/delete/c/:VideoId").delete(DeleteVideo);
router.route("/Publishstatus/c/:VideoId").get(TogglePublishStatus)
router.route("/VideoUploadByOwner").get( verifyjwt , VideoUploadedByOwner)

export default router;