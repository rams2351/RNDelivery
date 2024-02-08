import { createAction } from "@reduxjs/toolkit";

export const sagaActions = {
    validateUser: createAction<any>('validateUser'),
    signUpUser: createAction<any>('signUpUser'),
    getAllProducts: createAction<any>('getAllProducts'),
    getProductDetail: createAction<any>('getProductDetail'),
    updateWishlist: createAction<any, any>('updateWishlist'),
    getProductsByCategory: createAction<any>('getProductsByCategory'),
    getUser: createAction<any>('getUser'),
    updateCart: createAction<any>('updateCart'),
    updateOrders: createAction<any>('updateOrder'),
    getAllUser: createAction('getAllUser'),
    getOrderList: createAction('getOrderList'),
    // getOrders:createAction('getOrders'),
    updateDriverLocation: createAction<any>('updateDriverLocation'),
    updateOrderStatus: createAction<any>('updateOrderStatus'),
    assignOrder: createAction<any>('assignOrder'),
    getPlacedOrders: createAction('getPlacedOrders'),
    getOrderDetail: createAction<any>('getOrderDetail'),
    getDriverInfo:createAction<any>('getDriverInfo')
}