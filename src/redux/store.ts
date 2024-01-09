import createSagaMiddleware from "@redux-saga/core";
import { configureStore, Store } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, Persistor, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { AppState } from "src/types/interface";
import { rootSaga } from "./saga";
import { persistedReducer } from "./slices/reducer";


const sagaMiddleWare  = createSagaMiddleware()

export const store: Store<AppState> = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
       serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],

        }
    }).concat(sagaMiddleWare)
})


export const persistor: Persistor = persistStore(store);

sagaMiddleWare.run(rootSaga)