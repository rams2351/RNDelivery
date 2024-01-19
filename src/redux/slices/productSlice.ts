import { createSlice } from "@reduxjs/toolkit";
import { Action, ProductsSlice } from "src/types/interface";

const initialState: ProductsSlice = {
    products: [],
    productDetail: null,
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, { payload }: Action<any>) => {
            state.products = payload?.list
        },
        setProductDetail: (state, { payload }: Action<any>) => {
            state.productDetail=payload
        },

    }
})


