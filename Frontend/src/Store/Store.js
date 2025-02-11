import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authslice'

const Store = configureStore({
    reducer: {
        auth: authSlice
    }
})

export default Store