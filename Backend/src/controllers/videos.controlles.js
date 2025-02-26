import { asyncHandler } from "../utils/async.handler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/api.response.js";
import { user } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { uploadoncloud } from "../utils/file.upload.js";
import { Comment } from "../models/commet.model.js";
import mongoose from "mongoose";
import { Like } from "../models/like.model.js";


// Get all videos with pagination, search, and sorting
const getallVidoes = asyncHandler(async (req, res) => {
  // Destructure query parameters with defaults
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  // Convert page and limit to numbers
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  
  // Calculate how many items to skip based on page number and limit
  const skip = (pageNum - 1) * limitNum;

  // Create search criteria if query is provided
  const searchCriteria = query
    ? { 
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } }
        ] 
      }
    : {}; // If no query, no search filter applied

  // Create user filter if userId is provided
  const userFilter = userId ? { user: userId } : {};

  // Combine search and user filters
  const filter = { ...searchCriteria, ...userFilter };

  // Sorting criteria: If sortBy is specified, use it; default to empty object
  const sortCriteria = sortBy ? { [sortBy]: sortType === "asc" ? 1 : -1 } : {};

  // Fetch videos based on the filter, pagination, and sorting
  const videos = await Video.find(filter)
    .skip(skip)  // Skip items based on page
    .limit(limitNum)  // Limit items to the specified limit
    .sort(sortCriteria);  // Sort the videos

  // Get total video count for pagination info
  const totalVideos = await Video.countDocuments(filter);

  // Return response with video data and pagination details
  return res.status(200).json({
    message: "Videos fetched successfully",
    videos,
    totalVideos,
    totalPages: Math.ceil(totalVideos / limitNum),  // Calculate total pages
    currentPage: pageNum,  // Current page number
  });
});



import path from 'path';

// publishing the video
const publishVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const thumbnail = req.files.thumbnail[0]; // extracts the first element of the array
  const VideoFile = req.files.VideoFile[0]; // extracts the first element of the aaray
 

  if (!title || !description || !thumbnail || !VideoFile) {
    throw new ApiError(404, "Title, description, thumbnail, and video file are required");
  }

  // finding the user in database
  const User = await user.findById(req.user._id);
  if (!User) {
    throw new ApiError(400, "User not found!");
  }

  //  Preparing File Paths for Upload: 
  // This normalizes the file paths of the uploaded files (thumbnail and VideoFile) to ensure they are in a consistent format. This is useful for file operations like uploading to Cloudinary.
  const thumbnailPath = path.normalize(thumbnail.path);
  const videoFilePath = path.normalize(VideoFile.path);

  //  Uploading the Files to Cloudinary
  let uploadedVideo, uploadedThumbnail;

  try {
    uploadedVideo = await uploadoncloud(videoFilePath);
    uploadedThumbnail = await uploadoncloud(thumbnailPath);

    if (!uploadedVideo || !uploadedThumbnail) {
      throw new Error("Failed to upload files to Cloudinary");
    }
  } catch (err) {
    console.error("Error uploading files to Cloudinary:", err);
    throw new ApiError(500, "Failed to upload files to Cloudinary");
  }

  // saving the video
  const newVideo = await Video.create({
    title,
    description,
    videoFile: uploadedVideo.url, // Use `videoFile` instead of `videoUrl`
    thumbnail: uploadedThumbnail.url, // Use `thumbnail` instead of `thumbnailUrl`
    owner: User._id, // Ensure the `owner` is set correctly
    time: new Date(), // Set the `time` field (or let it default in the schema)
    VideoCloudinaryPublicId: uploadedVideo.public_id,
    thumbnailCloudinaryPublicId: uploadedThumbnail.public_id
  });

  return res.status(201).json(
    new ApiResponse(201, "Video uploaded successfully", newVideo)
  );
});





const getVideoAndChannelProfile = asyncHandler(async (req, res) => {
  const { VideoId } = req.params; // Expecting a valid VideoId from URL parameters
  const userID = req.user._id
  
  if (!VideoId) {
    throw new ApiError(400, "Video ID is required!");
  }

  // Fetch the video details by VideoId
  const foundVideo = await Video.findById(VideoId).select(
    "videoFile thumbnail title description time VideoCloudinaryPublicId thumbnailCloudinaryPublicId owner isPublished"
  );

  if (!foundVideo) {
    throw new ApiError(404, "Video not found");
  }

  // Fetch the channel details based on the video's owner.
  // Assuming 'owner' is stored as an ObjectId reference to the user.
  const channel = await user.aggregate([
    {
      // Match using the owner's _id
      $match: {
        _id: foundVideo.owner,
      },
    },
    {
      // Lookup the channel's subscribers
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subcribers",
      },
    },
    {
      // Lookup the channels the user subscribed to
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subcriber",
        as: "subcribedto",
      },
    },
    {
      // Calculate additional fields
      $addFields: {
        subscibersCount: { $size: "$subcribers" },
        channelssubscribedtoCount: { $size: "$subcribedto" },
        isSubscribed: {
          $cond: {
            if: { $in: [req.User?._id, "$subcribers.subcriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      // Project only the fields you want to return
      $project: {
        fullname: 1,
        username: 1,
        subscibersCount: 1,
        channelssubscribedtoCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, "Channel does not exist");
  }


  // commmets

     
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
       
       // this user is logined in user and who watches the video
       const Userr = await user.findById( new mongoose.Types.ObjectId(userID))
       .select(
        "username avatar createdAt "
       )
     

           return res.status(200).json(
        new ApiResponse(200, { video: foundVideo, channel: channel[0]  ,  Comments: Comments , Userr ,

        }, "Video and channel fetched successfully!")
      );
});



const UpdateVideodetails = asyncHandler(async(req , res) => {
  // taking the video id from the user
  // finding the video in the base of videos 
  // taking new Information for eg title , description and thumbnail
  // saving the new information as NEWINFO in database
  // returing the response to the USER
  const {VideoId} = req.params
  if (!VideoId) {
    throw new ApiError(404 , "Video Id required!")
  }

  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(401, "Title and description are required");
  }
  
  const FoundVideoID = await Video.findById(new mongoose.Types.ObjectId(VideoId))
  if(!FoundVideoID) {
    throw new ApiError(400 , "Invaild Video Id")
  }
  
  const updatedVideo = await Video.findByIdAndUpdate(
    VideoId,  // Use the video ID to find the document
    { title, description },
    // Update the title and description
    { new: true }  // Return the updated document
  );
  if (!updatedVideo) {
    throw new ApiError(400, "Something went wrong while updating the video");
  }
  return res
  .status(201)
  .json({
    message: "Video title and description updated successfully",
    data: updatedVideo
  });

})





const DeleteVideo = asyncHandler(async(req , res) => {
  // take video id from the user
  // find the video in database 
  // delete the video in database by findbyIdandDelete (this method requried a object!)
  // return response to the user
  const { VideoId } = req.params;
  
  // Check if VideoId is provided
  if (!VideoId) {
    throw new ApiError(400, "Video ID is required!");
  }

  // Find the video in the database and delete
  const FindVideo = await Video.findByIdAndDelete(VideoId);

  // Handle the case where the video is not found
  if (!FindVideo) {
    throw new ApiError(404, "Video not found or already deleted!");
  }

  // Return success response to the user
  return res.status(200).json(
    new ApiResponse("Video deleted successfully!")
  );
});





const TogglePublishStatus = asyncHandler(async(req , res) => {
  const {VideoId} = req.params
  if (!VideoId) {
    throw new ApiError(404 , "Video Id is requried!")
  }

  const FoundVideoId = await Video.findById(VideoId)
  if (!FoundVideoId) {
    throw new ApiError(400 , "Enter a vaild Video ID")
  }

  if (FoundVideoId.isPublished) {
    FoundVideoId.isPublished = true;
  }
  else{
    FoundVideoId.isPublished = false
  }

  await FoundVideoId.save()

   return res
  .status(201)
  .json(
    new ApiResponse(201 ,  "video is Published Sucessfully!")
  )

})

export {
    getallVidoes,
    publishVideo,
    getVideoAndChannelProfile,
    UpdateVideodetails,
    DeleteVideo,
    TogglePublishStatus
}
