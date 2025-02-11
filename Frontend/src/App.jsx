import React  from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/Footer";

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
      </main>
      <Footer />
    </>
  );
}

export default App;

  
  // useEffect(() => {
  //   if (calledRef.current) return;
  //   calledRef.current = true;

  //   axios
  //     .get("/api/users/current-user", { withCredentials: true })

  //     .then((response) => {
  //       console.log("Current User API Response:", response.data);

  //       const user = response.data.data?.user;

  //       if (user) {
  //         dispatch(login(user)); // Dispatch login action
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching current user:", error);
  //       dispatch(logout());
  //     });
  // }, [dispatch]);