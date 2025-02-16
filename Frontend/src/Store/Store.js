// Store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";

const Store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default Store;
