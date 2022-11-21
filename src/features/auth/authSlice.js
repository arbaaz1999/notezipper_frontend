import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, registerUser, userAuth } from './authThunk';

const initialState = {
    isError: false,
    isLoading: false,
    token: null,
    isAdmin: null,
    email: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [registerUser.rejected]: (state) => {
            state.isError = true
        },
        [userAuth.pending]: (state) => {
            state.isLoading = true
        },
        [userAuth.fulfilled]: (state, action) => {
            state.isLoading = false
            state.token = action.payload.data.token
            state.email = action.payload.data.email
            state.isAdmin = action.payload.data.isAdmin
            state.isError = false
        },
        [userAuth.rejected]: (state) => {
            state.isLoading = false
            state.isError = true
        },
        [checkAuth.pending]: (state) => {
            state.isLoading = true
        },
        [checkAuth.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAdmin = action.payload.admin;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isError = false;
        },
        [checkAuth.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        }
    }
})

export const authReducer = authSlice.reducer;