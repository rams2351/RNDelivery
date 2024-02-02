import createSagaMiddleware from "@redux-saga/core";
import { configureStore, Store } from "@reduxjs/toolkit";
import { Persistor, persistStore } from 'redux-persist';
import { AppState } from "src/types/interface";
import { rootSaga } from "./saga";
import { persistedReducer } from "./slices/reducer";


const sagaMiddleWare  = createSagaMiddleware()

export const store: Store<AppState> = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //    serializableCheck: {
    //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     }
        serializableCheck: false,
         immutableCheck: false,
    }).concat(sagaMiddleWare)
})


export const persistor: Persistor = persistStore(store);

sagaMiddleWare.run(rootSaga)