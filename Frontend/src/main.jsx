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
import VideosUpload from "./Pages/VideosUpload";
import VideoPlayerPage from "./Pages/VideoPlayer";
import ManageVideosss from './Pages/ManageVideossss'
import EditTitleDes from "./Components/Video/EditTitleDes";
import ChannelInfo from "./Components/Channel/ChannelInfo";
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
          <AuthLayout authentication = {false}>
            <LikedVideos/>
          </AuthLayout>
        )
      },
      {
        path: "/playlists",
        element: (
          <AuthLayout authentication  = {false}>
            <Playlist/>
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
      path: "/watch/c/:VideoId/c/:ChannelId",
      element: (
        <AuthLayout authentication = {false}
        >
          <VideoPlayerPage/>
        </AuthLayout>
      )
     },
     {
      path: "/Manage-Videos" , 
      element: (
        <AuthLayout authentication = {true}>
     <ManageVideosss/>
        </AuthLayout>
      )
     },
     {
      path: "/EditVideoDetails/:VideoId",
      element: (
        <AuthLayout authentication = {true} >
       <EditTitleDes/>
        </AuthLayout>
      )
     },
     
    {
      path: "/channelInfo/c/:ChannelId",
      element: (
        <AuthLayout>
          <ChannelInfo/>
        </AuthLayout>
      )
    }
    
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
