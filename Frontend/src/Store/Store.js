// Store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import themeReducer from './ThemeSlice'
import  ClickToSub  from "./Subscribe";


const Store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    Sub: ClickToSub 
  }
});

export default Store;
