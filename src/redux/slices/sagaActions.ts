import { createAction } from "@reduxjs/toolkit";

export const sagaActions = {
    validateUser: createAction<any>('validateUser'),
    signUpUser: createAction<any>('signUpUser'),
    getAllProducts:createAction('getAllProducts')
}