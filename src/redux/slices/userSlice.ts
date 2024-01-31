import { createSlice } from "@reduxjs/toolkit";
import { Action, UserSlice } from "src/types/interface";

const initialState:UserSlice = {
    user: null,
    orders:[]
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, { payload }: Action<any>) => {
            state.user = payload
        },
        setOrders :(state, { payload }: Action<any>) => {
            state.orders = payload.list
        },
    }
})