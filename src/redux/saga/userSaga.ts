import { call, put, takeLeading } from "redux-saga/effects";
import * as ApiProvider from 'src/api';
import { Action } from "src/types/interface";
import { AuthScreens, _showErrorMessage } from "utils/all";
import { NavigationService } from "utils/NavigationService";
import { actions } from "../slices/reducer";

function* validateUser({ payload }: Action<any>): Generator<any, any, any>{

    yield put(actions.setLoading(true))
    try {
        let res = yield call(ApiProvider._validateUser, `(phone,eq,${payload.slice(3)})`)
        if (res?.Id) {
            yield put(actions.setUserData(res))
        }
        yield put(actions.setLoading(false))
        NavigationService.push(AuthScreens.VERIFY_OTP,{phone:payload})
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


function* getUser({ payload }: Action<any>): Generator<any, any, any>{

    yield put(actions.setLoading(true))
    try {
        let res = yield call(ApiProvider._validateUser, `(Id,eq,${payload})`)
        if (res?.Id) {
            yield put(actions.setUserData(res))
        }
        yield put(actions.setLoading(false))
    } catch (err) {
        console.log(err, 'Catch Error in validate user')
        _showErrorMessage('Some thing went wrong on validate user!')
        yield put(actions.setLoading(false))
    }
}

function* updateWishlist({payload:{list,id,loader}}:Action<any>): Generator<any, any, any>{
    // yield put(actions.setLoading(true))
    loader(true)

    let pay = { wishlist: JSON.stringify(list), id: id }
    try {
        let res = yield call(ApiProvider._updateWishlist,pay)
         if (res) {
                 yield put(actions.setUserData(res))
        }   else {
             console.log('something went wrong');
         }
        loader(false)
            yield put(actions.setLoading(false))

    } catch (error) {
        console.log("Catch Error", error);
        loader(false)
        yield put(actions.setLoading(false));
    }
}

function* updateCartList({ payload:{list,id} }: Action<any>): Generator<any, any, any>{
    yield put(actions.setLoading(true))
    let pay = { cart: JSON.stringify(list), id: id }
    try {
        let res = yield call(ApiProvider._updateWishlist,pay)
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

function* updateOrders({ payload:{list,id} }: Action<any>): Generator<any, any, any>{
    yield put(actions.setLoading(true))
    let pay = { orders: JSON.stringify(list),cart:JSON.stringify([]), id: id }
    try {
        let res = yield call(ApiProvider._updateWishlist,pay)
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

export default function* watchUsers() {
    yield takeLeading(actions.validateUser.toString(), validateUser)
    yield takeLeading(actions.signUpUser.toString(), signUpUser)
    yield takeLeading(actions.updateWishlist.toString(), updateWishlist)
    yield takeLeading(actions.getUser.toString(), getUser)
    yield takeLeading(actions.updateCart.toString(), updateCartList)
    yield takeLeading(actions.updateOrders.toString(),updateOrders)
}