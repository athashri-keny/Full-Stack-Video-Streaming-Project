import { createSlice } from '@reduxjs/toolkit'


// getting iniital Mode
const initialState = {
    DarkMode: localStorage.getItem('dark') === 'true'
}

const ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeMode: (state ) => {
            state.DarkMode = !state.DarkMode; // toggling the dark mode 
            localStorage.setItem("dark" , state.DarkMode)
        }
    }
})
export const {changeMode} = ThemeSlice.actions
export default ThemeSlice.reducer