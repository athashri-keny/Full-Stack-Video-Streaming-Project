Full Stack Streaming App

A Full Stack Streaming App built using the MERN stack

Table of Contents -
1. OverView
2. Features
3. Technologies Used
4. Demo
5. Setup and installation
6. Usage
7. Contributing


Overview

This full stack streaming application enables users to sign up, watch, like, and comment on videos. It also allows users to upload their own videos, manage playlists, track their watch history, subscribe to channels, and customize their profiles—all within a modern and responsive interface.

Features

1. User Authentication: Secure sign up and login using JWT-based cookie authentication.
2. Video Streaming: Watch videos once signed in.
3. Engagement: Like videos and view your liked content.
4. Comments: Add, edit, or delete comments on videos.
5. Video Upload: Upload your own video along with a thumbnail, description, and title.
6. Playlist Management: Create custom playlists for later viewing.
7. Watch History: Automatically track your video watch history.
8. View Count: Video views increase with each view.
9. Subscriptions: Subscribe to your favorite channels and see who they are subscribed to.
10. Dark Mode: Toggle between light and dark themes for a personalized experience.
11. Profile Customization: Edit your avatar, background image, password, and username post-login.


Technologies Used

Frontend 

. HTML, Tailwind CSS, JavaScript , React
. Tailwind Css for building the UI
. React Redux Toolkit for state management
. React Router DOM for client-side routing
. React Hook Form for form handling
. JWT (for cookies) for authentication

Backend

. Node.js & Express.js for server-side logic 
. MongoDB & Mongoose for the database
. Cloudinary for media management
. Multer for handling file uploads
. JWT & jsonwebtoken for secure authentication
. Cookie-parser for parsing cookies

Demo

Explore the live application here: https://full-stack-video-streaming-project-hlxr.onrender.com/


Screenshots

![Screenshot (55)](https://github.com/user-attachments/assets/46341add-3429-4cc8-8105-5b68b391bcd7)

![Screenshot (54)](https://github.com/user-attachments/assets/56982360-f4fd-47de-ba26-93afee0a8ffd)

![Screenshot (53)](https://github.com/user-attachments/assets/34da3300-9ebf-4ab9-b37b-c79ab4035fd6)

![Screenshot (52)](https://github.com/user-attachments/assets/21824878-1fc5-4d37-ac68-be0295542e75)

![Screenshot (51)](https://github.com/user-attachments/assets/34d976b7-526d-48f3-b1a9-de6a82e36d86)

![Screenshot (50)](https://github.com/user-attachments/assets/cf842951-0cb0-49b4-8771-fa26d270e8b4)

![Screenshot (49)](https://github.com/user-attachments/assets/593f3544-40d2-4e90-b7f3-2123338e832c)


Setup and Installation

Clone the repository: git clone https://github.com/yourusername/your-repo.git
Install Dependencies: 
1. For the frontend: cd frontend,
npm install
2. For Backend: cd ../backend
npm install
 Environment Variables:
Configure the necessary environment variables for both the frontend and backend (e.g., database connection strings, JWT secret keys, Cloudinary credentials).
Run the app npm start/npm run dev

Usage

User Interaction :  Sign up or log in to access all streaming features.
Browse Content: Watch, like, and comment on videos.
Upload and Manage: Upload your own videos and manage playlists.
Profile Management: Customize your profile settings and toggle dark mode..


Contributing


Contributions are welcome! Please fork the repository, create a new branch for your feature or bug fix, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.


