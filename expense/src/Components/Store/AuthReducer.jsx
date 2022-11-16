import {createSlice} from '@reduxjs/toolkit'


const authSlice=createSlice({
   name:'auth',
   initialState:{
    token:''
   },
   reducers:{
    login(state,{payload}){
    state.token=payload
    localStorage.setItem("token",payload);
    },
    logout(){
    localStorage.removeItem("token");
    },
    initialToken(state){
        let token= localStorage.getItem('token')
        state.token=token  
    }
   }

})
export const authActions=authSlice.actions
export default authSlice.reducer;