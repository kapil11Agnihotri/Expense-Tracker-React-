import { createSlice } from "@reduxjs/toolkit";

const themeSlice=createSlice({
    name:'theme',
    initialState:{
        toggle:true
    },
    reducers:{
        togglefun(state){
        state.toggle=!state.toggle
        }
    }
})

export const themeActions=themeSlice.actions;
export default themeSlice.reducer;