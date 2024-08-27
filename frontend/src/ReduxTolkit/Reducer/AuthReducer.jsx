/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null,
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
         setAuthUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        LogOut: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
    },

})

export default AuthSlice.reducer

export const { setAuthUser, LogOut } = AuthSlice.actions;