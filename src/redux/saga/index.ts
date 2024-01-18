import { all, fork } from "redux-saga/effects";
import watchProducts from "./productSaga";
import watchUsers from "./userSaga";

export function* rootSaga() {
    yield all([
        fork(watchUsers),
        fork(watchProducts)
    ])
}