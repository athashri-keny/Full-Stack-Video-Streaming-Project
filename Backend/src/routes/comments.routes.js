import { Router } from "express";
import { ADDComments, UpdateComment  , DeleteComment, GetVideoComment} from "../controllers/comments.controllers.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/c/:VideoId").get(verifyjwt , GetVideoComment)
router.route("/Add/c/:VideoId").post( verifyjwt , ADDComments)
router.route("/update/c/:CommentId/c/:VideoId").patch(verifyjwt , UpdateComment)
router.route("/delete/c/:CommentId/c/:VideoId").delete(DeleteComment)


export default router