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
      console.log('user fetched sucessfully!' , response.data)
     }
  })
 

  return (
    <>
      <Header />
      <main>
        <Outlet />
        <SideNav />
         </main>
      <Footer />
    </>
  );
}

export default App;
