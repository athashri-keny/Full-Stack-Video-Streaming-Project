// authslice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   status: localStorage.getItem('accessToken') || false,
   userData: localStorage.getItem('refreshToken' ) || null,
  // status: false,
  // userData: null
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;  // Stores the whole payload (user info) which come from login 
      localStorage.setItem('accessToken' , action.payload.accesstoken)
      localStorage.setItem('refreshToken' , action.payload.refreshToken)
      console.log('Payload:', action.payload);
 
     },
    logout: (state , action) => {
      state.status = false
      state.userData = null;
      localStorage.removeItem('accessToken' )
      localStorage.removeItem("refreshToken")
    }
  }
});



export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
