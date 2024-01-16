import { call, put, takeLeading } from "redux-saga/effects";
import * as ApiProvider from 'src/api';
import { Action } from "src/types/interface";
import { _showErrorMessage } from "utils";
import { actions } from "../slices/reducer";

function* validateUser({ payload }: Action<any>): Generator<any, any, any>{

    yield put(actions.setLoading(true))
    try {
        let res = yield call(ApiProvider._validateUser, payload)
        if (res?.Id) {
            yield put(actions.setUserData(res))
            yield put(actions.setLoading(false))
        }
            yield put(actions.setLoading(false))
    } catch (err) {
        console.log(err, 'Catch Error in validate user')
        _showErrorMessage('Some thing went wrong on validate user!')
        yield put(actions.setLoading(false))
    }
}


function* signUpUser({ payload }: Action<any>): Generator<any, any, any>{
    yield put(actions.setLoading(true))
    try {
        let res = yield call(ApiProvider._addUser, payload)

        if (res?.Id) {
            yield put(actions.setUserData(res))
            yield put(actions.setLogin(true))
            yield put(actions.setLoading(false))
        }
    } catch (err) {
        console.log(err, 'Catch Error in validate user')
        _showErrorMessage('Some thing went wrong on validate user!')
        yield put(actions.setLoading(false))
    }
}


export default function* watchUsers() {
    yield takeLeading(actions.validateUser.toString(), validateUser)
    yield takeLeading(actions.signUpUser.toString(),signUpUser)
}