// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/Store"; 
import App from "./App";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import AuthLayout from "./Components/Authlayout";
import Home from "./Pages/Home";
import UserInfo from "./Components/UserInfo";
import EditPassword from "./Components/EditPassword";
import UpdateAccountDetails from "./Components/UpdateAccountDetails";
import History from './Pages/History'
import LikedVideos from './Pages/LikedVideos'
import Playlist from './Pages/Playlist'
import Tweets from './Pages/Tweets'
import VideosUpload from "./Pages/VideosUpload";
import VideoPlayerPage from "./Pages/VideoPlayer";
import CloudinaryPlayer from "./Components/Cloudinary/CloudinaryPlayer";

// Define routes
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />, // Homepage or main page
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/userinfo",
        element: (
          <AuthLayout authentication={true}>
            <UserInfo />
          </AuthLayout>
        ),
      },
      {
        path: "/EditProfile",
        element: (
          <AuthLayout authentication={true}>
            <EditPassword />
          </AuthLayout>
        ),
      },
      {
        path: "/EditNAME",
        element: (
          <AuthLayout authentication={true}>
            <UpdateAccountDetails />
          </AuthLayout>
        ),
      },
      {
         path: "/history",
         element: (
          <AuthLayout authentication = {true}>
            <History/>
          </AuthLayout>
         )
      },
      {
        path: "/liked-videos",
        element: (
          <AuthLayout authentication = {true}>
            <LikedVideos/>
          </AuthLayout>
        )
      },
      {
        path: "/playlists",
        element: (
          <AuthLayout authentication  = {true}>
            <Playlist/>
          </AuthLayout>
        )
      },
      {
        path: "/tweets",
        element: (
          <AuthLayout authentication = {true}>
            <Tweets/>
          </AuthLayout>
        )
      },
      {
        path: "/upload",
        element: (
          <AuthLayout authentication = {true}>
            <VideosUpload/>
          </AuthLayout>
        )
      },
      {
        path: "/watch/c/:VideoId",
        element: (
          <AuthLayout authentication ={true}>
         <VideoPlayerPage/>
          </AuthLayout>
        )
      },
      
       ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);
