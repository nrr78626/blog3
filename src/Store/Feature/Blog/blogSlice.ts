import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast, Bounce } from "react-toastify";

export interface BlogState {
    loading: boolean,
    blogs: any
}

const initialState: BlogState = {
    blogs: [],
    loading: false
}

//Fetch All Blogs

export const getallblogs = createAsyncThunk("fetchallblogs", async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/GetAllBlogs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json()
        console.log(json)
        return json
    } catch (error) {
        console.log(error)
    }
})

//add Blog
export const addBlog = createAsyncThunk("addBlog", async ({ title, description, content }: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/AddBlog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, content })
        })
        const json = await response.json()
        console.log(json)
        return json
    } catch (error) {
        console.log(error)
    }
})

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addBlog.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addBlog.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(addBlog.fulfilled, (state, action) => {
            state.loading = false
            state.blogs.push(action.payload.blog)
        })
        builder.addCase(getallblogs.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getallblogs.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getallblogs.fulfilled, (state, action) => {
            state.loading = false
            state.blogs = action.payload.blogs
        })

    }
})

export const { } = blogSlice.actions

export default blogSlice.reducer