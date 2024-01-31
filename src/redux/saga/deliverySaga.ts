import { call, put, takeLeading } from "redux-saga/effects";
import * as ApiProvider from 'src/api/ApiProvider';
import { Action } from "src/types/interface";
import { _showErrorMessage } from "utils/Utils";
import { actions } from "../slices/reducer";


function* getAllUsers({ payload }: Action<any>): Generator<any, any, any>{
    yield put(actions.setLoading(true))
    try {
        let res = yield call(ApiProvider._getAllUsers)
        if (res) {
            yield put(actions.setAllUser(res))
        }
        yield put(actions.setLoading(false))
    }
    catch (err) {
    yield put(actions.setLoading(false))
        _showErrorMessage("Something wrong in get All user saga")
    }
}
function* getOrderList({ payload }: Action<any>): Generator<any, any, any>{
    yield put(actions.setLoading(true))
    try {
        let res = yield call(ApiProvider._getOrderList)
        if (res) {
            yield put(actions.setOrderList(res))
        }
        yield put(actions.setLoading(false))
    }
    catch (err) {
    yield put(actions.setLoading(false))
        _showErrorMessage("Something wrong in get All user saga")
    }
}


export default function* watchDelivery() {
    yield takeLeading(actions.getAllUser.toString(), getAllUsers)
    yield takeLeading(actions.getOrderList.toString(),getOrderList)
}