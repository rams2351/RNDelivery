import { createSlice } from "@reduxjs/toolkit"
import { Action, ExtraSlice } from "src/types/interface"

const initialState: ExtraSlice = {
    loading:false
}

export const extraSlice = createSlice({
    name: 'extra',
    initialState,
    reducers: {
        setLoading: (state, { payload }: Action<boolean>)=> {
    state.loading = payload || false
        }
    }
})