import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    }, 
    likes : {
      type : Number,
      default : 0,
  },
    isPublished: {
      type: Boolean,
      default: true, 
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    
    VideoCloudinaryPublicId: {
      type: String,
      required: true
    },
    thumbnailCloudinaryPublicId: {
      type: String,
      required: true
    }
  },
 
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);



videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema);
