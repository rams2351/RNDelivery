import { createSlice } from "@reduxjs/toolkit";
import { Action } from "src/types/interface";

interface authType{
    data: any;
    isLogin: boolean;
}

const initialState: authType = {
    data: {},
    isLogin:false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, { payload }: Action<boolean>) => {
            console.log(state,'in authstate')
            state.isLogin = payload
        }
    }
})