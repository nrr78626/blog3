import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";

export interface UserState {
    user: any,
    isLoading: boolean,
    success: boolean,
    currenUser: any
}

const initialState: UserState = {
    user: [],
    isLoading: false,
    success: false,
    currenUser: {}
}

// Fetch All Users from data base
export const fetchAllUser = createAsyncThunk("fetchuser", async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/FetchAllUsers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        return json
    } catch (error) {
        console.log(error)
    }
})

// Add User Api call

export const signupUser = createAsyncThunk("user", async ({ name, email, contact, password, age }: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/Signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, contact, password, age })
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

// Login User

export const loginUser = createAsyncThunk("loginuser", async ({ email, password }: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
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

//Edit User Role 

export const editUserRole = createAsyncThunk("edituser", async ({ userId, userRole }: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/EditUserRole`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, userRole })
    })
    const json = await response.json()
    return json
})

export const myprofile = createAsyncThunk("myprofile", async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/MyProfile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        return json
    } catch (error) {
        console.log(error)
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user.push(action.payload.user)
            state.success = action.payload.success
        })
        builder.addCase(fetchAllUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchAllUser.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
        })
        builder.addCase(editUserRole.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(editUserRole.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(editUserRole.fulfilled, (state, action) => {
            state.isLoading = false
            console.log(action.payload)
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.success = true
        })
        builder.addCase(myprofile.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(myprofile.rejected, (state, action) => {
            state.isLoading = false
            state.success = false
        })
        builder.addCase(myprofile.fulfilled, (state, action) => {
            state.isLoading = false
            state.success = true
            state.currenUser = action.payload.user
        })
    }
})

export const { } = userSlice.actions

export default userSlice.reducer
