import React, { useEffect }  from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/Footer";
import SideNav from "./Components/SideNav/SideNav";

import axios from "axios";
import { useSelector } from "react-redux";

function App() {
  const darkMode = useSelector((state) => state.theme.DarkMode)
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark" )
    } else {
      document.body.classList.add("white")
    }
  } , [])
  

  axios.get('api/users/current-user' ,  {withCredentials: true} )
  .then((response) => {
    if (response.data) {
      console.log('user fetched sucessfully!')
     }
  })


  // console.log(darkMode)

 
  return (
    <>
      <Header />
      <main className="flex min-h-screen">
      <div className="flex-1 bg-gray-100 white:bg-gray-900">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};


export default App;
