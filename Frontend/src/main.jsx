import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider }  from "react-redux";
import store from "./Store/Store"; // Import your Redux store
import App from "./App";
import Login from './Pages/login'
import Signup from './Pages/signup'
import AuthLayout from './Components/Authlayout'
import Home from "./Pages/Home";
import UserInfo from "./Components/Header/UserInfo";

// Define routes
const Router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [

  {
    path: "/",
    element: <Home />, // App (homepage or any main page)
  },
  {
    path: '/login',
    element: (
      <AuthLayout authentication = {false}>
       <Login/>
      </AuthLayout>
    )
  },
  {
    path: '/signup',
    element:  (
      <AuthLayout authentication = {false}>
        <Signup/>
      </AuthLayout>
    )
  },
  {
    path: '/userinfo',
    element: (
      <AuthLayout authentication= {true}>
        <UserInfo/>
      </AuthLayout>
    )
  }

]
  }
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);
