import { Router } from "express";
import { ADDComments, UpdateComment  , DeleteComment, GetVideoComment  , GetCommentId} from "../controllers/comments.controllers.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/c/:VideoId").get(verifyjwt , GetVideoComment)
router.route("/Add/c/:VideoId").post( verifyjwt , ADDComments)
router.route("/update/c/:VideoId").patch( verifyjwt ,  UpdateComment)
router.route("/delete/c/:VideoId").delete( verifyjwt , DeleteComment)
router.route("/GetCommentId/c/:VideoID").get(  verifyjwt ,  GetCommentId)


export default router