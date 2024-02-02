import { createSlice } from "@reduxjs/toolkit";
import { Action, DeliverySlice } from "src/types/interface";

const initialState:DeliverySlice = {
    allUsers: [],
    ordersList: [],
    orderDetail: null,
    driverInfo:null
}

export const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        setAllUser: (state, { payload:{list} }:Action<any>) => {
            state.allUsers=list
        },
        setOrderList: (state, { payload: { list } }: Action<any>) => {
            state.ordersList=list
        },
        setDriverInfo:(state, { payload }: Action<any>) => {
            state.driverInfo=payload
        },
        setOrderDetail:(state, { payload }: Action<any>) => {
            state.orderDetail=payload
        },
    }
})