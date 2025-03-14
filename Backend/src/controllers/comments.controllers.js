import { ApiResponse } from "../utils/api.response.js";
import { asyncHandler } from "../utils/async.handler.js";
import {ApiError} from "../utils/ApiError.js"
import { Comment } from "../models/commet.model.js";
import mongoose from "mongoose";
import { user } from "../models/user.model.js";
import {Video} from '../models/video.model.js'
// This function retrieves comments for a specific video.



const GetVideoComment = asyncHandler(async(req , res) => {
    const {VideoId } = req.params
    const userID = req.user._id
  
    if (!VideoId) {
        throw new ApiError(404 , "Video ID is required!")
    }
    const {page = 1 , limit  = 10} = req.query

    const pageNum = parseInt(page , 10)
    const limitNum = parseInt(limit , 10)

    const skip = (pageNum - 1) * limitNum

    const Comments = await Comment.find({ video: new mongoose.Types.ObjectId(VideoId) })
    .skip(skip) // Don't skip any comments
    .limit(limitNum) // Return the first 10 comments
    .sort({ createdAt: -1 }); // Ensure the 10 most recent comments are shown
    
    const Userr = await user.findById( new mongoose.Types.ObjectId(userID))
   .select(
       "username avatar createdAt"
  )
    return res
    .status(200)
    .json(
        {
         ApiResponse,
         page: pageNum,
         limit : limitNum,
         Comments: Comments,
         owner: Userr
    }
)
});


const GetCommentId = asyncHandler(async( req , res) => {
    const  {VideoId} = req.params
    const UserId = req.user._id

  if (!UserId) {
    console.log("User not found")
  }



 const comment = await Comment.findOne({VideoId: VideoId})

 const Userr = await user.findById( new mongoose.Types.ObjectId(UserId))


  return res
  .status(200)
  .json(
      {
       ApiResponse,
       CommentId :  comment,
       owner : Userr
  }
)
})


const ADDComments = asyncHandler(async(req , res) => {
    // find the User in database
    // take the videoId and Comment content from the req.body(User)
    // save the Comment in database
    // return response 
    const UserID = req.user._id
     if (!UserID) {
        throw new ApiError(400 , "User is required!")
     }
    const {VideoId} = req.params
    if (!VideoId) {
        throw new ApiError(404 , "Video Id incorrect")
    }

    const {Content} = req.body
    if (!Content) {
        throw new ApiError(404 , "Comments content required!!")
    }
     
    const User = await user.findById(UserID)
    if (!User) {
        throw new ApiError(400 , "User not Found in database")
    } 

    // creating comment 
    const comment = await Comment.create({
        video : VideoId,
        owner: UserID,
        content: Content
    })

    res.status(201).json({
        success: true,
        message: "Comment created successfully!",
        comment,
        ApiResponse, // Include this if it holds relevant data
    });
})



const UpdateComment = asyncHandler(async (req, res) => {
    const userID = req.user._id;

    const User = await user.findById(userID);
    if (!User) {
        throw new ApiError(400, "User not Found in database");
    }

    const { UpdatedComment } = req.body;
    if (!UpdatedComment) {
        throw new ApiError(404, "New comment content required!");
    }

    const { CommentId } = req.body;
    if (!CommentId) {
        throw new ApiError(404, "Comment Id required!");
    }

    if (!mongoose.Types.ObjectId.isValid(CommentId)) {
        throw new ApiError(400, "Invalid Comment ID");
    }

    const { VideoId } = req.params;
    if (!VideoId) {
        throw new ApiError(404, "Video id required!");
    }
    if (!mongoose.Types.ObjectId.isValid(VideoId)) {
        throw new ApiError(400, "Invalid Video ID");
    }

    // Check if the comment exists, belongs to the user and video, then update
    const comment = await Comment.findOneAndUpdate(
        {
            _id: CommentId,
       },
        { content: UpdatedComment },
        { new: true } // Returns the updated document
    );

    if (!comment) {
        throw new ApiError(404, "Comment not found ");
    }

    return res.status(200).json({
        success: true,
        message: "Comment updated successfully!",
        data: comment
    });
});


const DeleteComment = asyncHandler(async(req , res) => {
    const {VideoId} = req.params
    if (!VideoId) {
        throw new ApiError(404 , "Video ID is required!")
    }
    
    const video = await Video.findById(new mongoose.Types.ObjectId(VideoId))

    const {CommentId} = req.body
    if (!CommentId) {
        throw new  ApiError(400 , "Comment Id is required!")
    }



    const FindComment = await Comment.findByIdAndDelete(new mongoose.Types.ObjectId(CommentId));

    if (!FindComment) {
        throw new ApiError(404, "Cannot delete comment! Comment not found.");
    }



    return res.status(200).json({ message: "comment deleted Successfully!" });

})

export {
    ADDComments,
    UpdateComment,
    DeleteComment,
    GetVideoComment,
    GetCommentId
}


