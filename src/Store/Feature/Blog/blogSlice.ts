import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast, Bounce } from "react-toastify";

export interface BlogState {
    loading: boolean,
    blogs: any,
    success: boolean
}

const initialState: BlogState = {
    blogs: [],
    loading: false,
    success: false
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

export const getUserBlog = createAsyncThunk("getuserblog", async ({ cat }: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/GetUsersBlog/${cat}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        return json.blogs
    } catch (error) {
        console.log(error)
    }
})

//add Blog
export const addBlog = createAsyncThunk("addBlog", async (formData: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/AddBlog`, {
            method: "POST",
            headers: {

            },
            body: formData
        })
        const json = await response.json()
        if (json.success) {
            toast.success(json.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            toast.error(json.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
        return json
    } catch (error) {
        console.log(error)
    }
})

export const deleteBlog = createAsyncThunk("deleteBlog", async (id: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/DeleteBlog`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "userid": id
            }
        })

        const json = await response.json()
        console.log(json)
        if (json.success) {
            toast.success(json.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            toast.error(json.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
        return json
    } catch (error) {
        console.log(error)
    }
})

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        getCurrentBlog(state, action) {

        }
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
            if (action.payload.blog) {
                state.blogs.push(action.payload.blog)
            }
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
            state.success = true
        })
        builder.addCase(getUserBlog.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getUserBlog.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getUserBlog.fulfilled, (state, action) => {
            state.loading = false
            state.blogs = action.payload
        })
        builder.addCase(deleteBlog.pending, (state) => {
            state.loading = true

        })
        builder.addCase(deleteBlog.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(deleteBlog.fulfilled, (state) => {
            state.loading = false
        })

    }
})

export const { getCurrentBlog } = blogSlice.actions

export default blogSlice.reducer