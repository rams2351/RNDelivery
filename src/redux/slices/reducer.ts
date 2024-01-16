import { combineReducers } from "@reduxjs/toolkit";
import { MMKVLoader } from "react-native-mmkv-storage";
import { PersistConfig, persistReducer } from "redux-persist";
import { authSlice } from "./auth";
import { extraSlice } from "./extraSlice";
import { sagaActions } from "./sagaActions";
import { userSlice } from "./userSlice";

const persistConfig: PersistConfig<any> = {
    key: 'root',
    version: 1,
    // storage: new MMKVLoader().withEncryption().initialize(),
    storage: new MMKVLoader().initialize(),
    whitelist:['auth']
}

const rootReducer :any = combineReducers({
    auth: authSlice.reducer,
    extra: extraSlice.reducer,
    user:userSlice.reducer,
})

export const actions = {
    ...authSlice.actions,
    ...extraSlice.actions,
    ...sagaActions,
    ...userSlice.actions
}

export const persistedReducer = persistReducer(persistConfig,rootReducer)