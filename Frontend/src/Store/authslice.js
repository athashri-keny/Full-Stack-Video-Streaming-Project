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
      localStorage.setItem('accessToken' , action.payload.accessToken)
      localStorage.setItem('refreshToken' , action.payload.refreshToken)
     },
    logout: (state) => {
      state.status = false
      state.userData = null
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
