import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    user:string[],
    isLoading:boolean
}

const initialState:UserState = {
    user:[],
    isLoading:false
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.user.push(action.payload)
        }
    },
    extraReducers:(builder)=>{

    }
})

export const {addUser} = userSlice.actions 

export default userSlice.reducer
