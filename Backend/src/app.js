import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

 // Make sure this is the correct import

const app = express();

// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true , limit: "16kb"}));
 //app.use(express.static("public"))
app.use(cookieParser())
app.use(express.static('public'));  

import userRouter from './routes/user.routes.js'; 
import tweetRouter from "./routes/tweets.routes.js"
import healthRouter from "./routes/health.routes.js";
import PlaylistRouter from "./routes/playlist.routes.js"
import VideosRouter from "./routes/vidoes.routes.js"
import CommentsRouter from "./routes/comments.routes.js"
import LikesRouter from "./routes/likes.routes.js"
import SubRouter from "./routes/subcription.routes.js"
import DashRouter from "./routes/dashboard.routes.js"
// Routes
// it is compursary to use an middleware because the routes is in other folder futher this is send to user routes 
app.use("/api/v1/users", userRouter); 
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/healthcheck" , healthRouter)
app.use("/api/v1/playlist" ,PlaylistRouter)
app.use("/api/v1/videos" , VideosRouter)
app.use("/api/v1/comments" , CommentsRouter)
app.use("/api/v1/likes" , LikesRouter)
app.use("/api/v1/subs" , SubRouter)
app.use("/api/v1/dash" , DashRouter)

// http://localhost:3000/api/v1/users/register

export { app };
