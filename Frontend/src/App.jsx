import React  from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/Footer";
import SideNav from "./Components/SideNav/SideNav";

import axios from "axios";



function App() {
  axios.get('api/users/current-user' ,  {withCredentials: true} )
  .then((response) => {
    if (response.data) {
      console.log('user fetched sucessfully!')
     }
  })
 
  return (
    <>
      <Header />
      <main className="flex min-h-screen">
          <div className="flex-1 bg-gray-100">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};


export default App;
