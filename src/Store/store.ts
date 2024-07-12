import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Feature/Auth/userSlice'
import blogSlice from './Feature/Blog/blogSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            userMethod:userSlice,
            blogMethod:blogSlice
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']