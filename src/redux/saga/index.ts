import { all, fork } from "redux-saga/effects";
import watchUsers from "./userSaga";

export function* rootSaga() {
    yield all([
        fork(watchUsers)
    ])
}