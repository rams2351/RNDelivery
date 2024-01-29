import { createAction } from "@reduxjs/toolkit";

export const sagaActions = {
    validateUser: createAction<any>('validateUser'),
    signUpUser: createAction<any>('signUpUser'),
    getAllProducts: createAction('getAllProducts'),
    getProductDetail: createAction<any>('getProductDetail'),
    updateWishlist: createAction<any,any>('updateWishlist'),
    getProductsByCategory: createAction<any>('getProductsByCategory'),
    getUser: createAction<any>('getUser'),
    updateCart: createAction<any>('updateCart'),
    updateOrders:createAction<any>('updateOrder')
}