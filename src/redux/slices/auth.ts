import { createSlice } from "@reduxjs/toolkit";
import { Action, AuthSlice } from "src/types/interface";



const initialState: AuthSlice = {
    isLogin:false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, { payload }: Action<boolean>) => {
            state.isLogin = payload
        }
    }
})