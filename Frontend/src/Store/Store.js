// Store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import themeReducer from './ThemeSlice'



const Store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
     }
});

export default Store;
