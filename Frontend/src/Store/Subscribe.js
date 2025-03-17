import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    subscribe: localStorage.getItem("Subscribe") === 'true'
}

const subSlice = createSlice({
    name: "Sub",
    initialState,
    reducers: {
        ClickToSub: (state) => {
         state.subscribe = !state.subscribe, // toggling the sub button
         localStorage.setItem("Subscribe" , state.subscribe)
        }
    }
}) 

export const {ClickToSub} = subSlice.actions
export default subSlice.reducer
