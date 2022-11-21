import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const registerUser = createAsyncThunk(
    '/registerUser',
    async (data, thunkAPI) => {
        console.log('user data is ', data)
        await axios({
            method: 'POST',
            url: 'https://localhost:443/api/users',
            data: data
        }).then(resp => {
            thunkAPI.fulfillWithValue(resp)
        }).catch(
            err => thunkAPI.rejectWithValue(err)
        )
    }
)


export const userAuth = createAsyncThunk(
    '/userAuth',
    async (data) => {
        let resp;
        return new Promise(async (resolve, reject) => {
            await axios({
                method: 'POST',
                url: 'https://localhost:443/api/users/login',
                data: data
            }).then((data) => {
                resp = data.data;
                localStorage.setItem('email', resp.data.email)
                localStorage.setItem('isAdmin', resp.data.isAdmin)
                localStorage.setItem('token', resp.data.token)
                return resolve(resp)
            }).catch((err) => {
                console.log('login error is', err)
                resp = err;
                return reject(resp)
            })
        })
    }
)


export const checkAuth = createAsyncThunk(
    '/checkAuth',
    async () => {
        let token = localStorage.getItem("token")
        let data;
        if (token) {
            let admin = localStorage.getItem('isAdmin')
            let email = localStorage.getItem('email')
            data = { token, admin, email }
        }
        return data;
    }
)