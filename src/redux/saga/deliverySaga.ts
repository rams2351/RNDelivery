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

function* updateDriverLocation({ payload:{coordinates,id} }: Action<any>): Generator<any, any, any>{
    // yield put(actions.setLoading(true))
    let pay = { driverLocation: JSON.stringify(coordinates), id: id }
    try {
        let res = yield call(ApiProvider._updateDriverLocation,pay)
         if (res) {
                //  yield put(actions.setUserData(res))
        }   else {
            //  console.log('something went wrong');
            }
            // yield put(actions.setLoading(false))

    } catch (error) {
        console.log("Catch Error", error);
        yield put(actions.setLoading(false));
    }
}

function* updateOrderStatus({ payload:{status,id,driverId} }: Action<any>): Generator<any, any, any>{
    yield put(actions.setLoading(true))
    let pay = { status:status, id: id, driverId:driverId }
    try {
        let res = yield call(ApiProvider._updateOrderStatus,pay)
         if (res) {
                 yield put(actions.setOrderList(res))
        }   else {
             console.log('something went wrong');
            }
            yield put(actions.setLoading(false))

    } catch (error) {
        console.log("Catch Error", error);
        yield put(actions.setLoading(false));
    }
}

function* assignOrder ({ payload:{order,id} }: Action<any>): Generator<any, any, any>{
    yield put(actions.setLoading(true))
    let pay = { assignedOrders: JSON.stringify(order), id: id }
    try {
        let res = yield call(ApiProvider._updateDriverLocation,pay)
         if (res) {
                 yield put(actions.setUserData(res))
        }   else {
             console.log('something went wrong');
            }
            yield put(actions.setLoading(false))

    } catch (error) {
        console.log("Catch Error", error);
        yield put(actions.setLoading(false));
    }
}


export default function* watchDelivery() {
    yield takeLeading(actions.getAllUser.toString(), getAllUsers)
    yield takeLeading(actions.getOrderList.toString(), getOrderList)
    yield takeLeading(actions.updateDriverLocation.toString(), updateDriverLocation)
    yield takeLeading(actions.updateOrderStatus.toString(), updateOrderStatus)
    yield takeLeading(actions.assignOrder.toString(),assignOrder)

}