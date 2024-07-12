import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast, Bounce } from "react-toastify";

export interface BlogState {
    success: boolean,
    loading: boolean,
    blogs: any
}

const initialState: BlogState = {
    blogs:[],
    loading:false,
    success:false
}

//add Blog
export const addBlog = createAsyncThunk("addBlog",async({title,description,content}:any)=>{

    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/AddBlog`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({title,description,content})
    })
    const json = await response.json()
    console.log(json)
    return json
})

export const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(addBlog.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(addBlog.rejected,(state,action)=>{
            state.loading = false
        })
        builder.addCase(addBlog.fulfilled,(state,action)=>{
            state.loading = false
            state.blogs.push(action.payload.blog)
        })
    }
})

export const {} = blogSlice.actions

export default blogSlice.reducer