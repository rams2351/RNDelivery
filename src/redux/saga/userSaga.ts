import { call, put, takeLeading } from "redux-saga/effects";
import * as ApiProvider from 'src/api';
import { Action } from "src/types/interface";
import { AuthScreens } from "utils/Constant";
import { _showErrorMessage } from "utils/Helpers";
import { NavigationService } from "utils/NavigationService";
import { actions } from "../slices/reducer";
import { store } from "../store";

function* validateUser({ payload }: Action<any>): Generator<any, any, any>{

    yield put(actions.setLoading(true))
    try {
        let res = yield call(ApiProvider._validateUser, `(phone,eq,${payload.slice(3)})`)
        if (res?.Id) {
            yield put(actions.setUserData(res))
        } else {
            yield put(actions.setUserData(null))
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
        }
        yield put(actions.setLoading(false))
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

function* updateWishlist({ payload: { list, id, loader } }: Action<any>): Generator<any, any, any>{
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

function* updateCartList({ payload:{list,id,loader} }: Action<any>): Generator<any, any, any>{
   loader(true)
    let pay = { cart: JSON.stringify(list), id: id }
    try {
        let res = yield call(ApiProvider._updateWishlist,pay)
         if (res) {
                 yield put(actions.setUserData(res))
        }   else {
             console.log('something went wrong');
            }
              loader(false)
    } catch (error) {
        console.log("Catch Error", error);
        loader(false)
    }
}

function* updateOrders({ payload }: Action<any>): Generator<any, any, any>{
    yield put(actions.setLoading(true))

    let pay = {
        ...payload,
                deliverTo: JSON.stringify(payload?.deliverTo),
                products: JSON.stringify(payload.products)
    }

    let userPay = { cart: JSON.stringify([]), id: payload.userId }
    try {
        let res = yield call(ApiProvider._addOrder, pay)
        let userData = yield call(ApiProvider._updateWishlist,userPay)
         if (res) {
                 yield put(actions.setOrderList(res))
        }
        if (userData) {
             yield put(actions.setUserData(userData))
        }  else {
             console.log('something went wrong');
            }
            yield put(actions.setLoading(false))

    } catch (error) {
        console.log("Catch Error", error);
        yield put(actions.setLoading(false));
    }
}

function* addAddress({ payload: { newAdd, id,key } }: Action<any>): Generator<any, any, any>{
    yield put(actions.setLoading(true))
    let add = store.getState().user.user.address

    let pay = {
        currentAddress: JSON.stringify(newAdd),
   address: key == 'add' ? JSON.stringify([...add, newAdd]) : JSON.stringify(add),
        id: id
    }
    try {
        let res = yield call(ApiProvider._updateWishlist,pay)
         if (res) {
             yield put(actions.setUserData(res))
             NavigationService.goBack()
         } else {
             console.log('something went wrong');
         }
        yield put(actions.setLoading(false))
    } catch (error) {
        console.log("Catch Error", error);
                   yield put(actions.setLoading(false))
        yield put(actions.setLoading(false));
    }
}

function* loggedAsPartner({ payload: { value, id } }: Action<any>): Generator<any, any, any>{

        yield put(actions.setLoading(true))

    let pay = { deliveryPartner: value, id: id }
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
                yield put(actions.setLoading(false))

    }
}


export default function* watchUsers() {
    yield takeLeading(actions.validateUser.toString(), validateUser)
    yield takeLeading(actions.signUpUser.toString(), signUpUser)
    yield takeLeading(actions.updateWishlist.toString(), updateWishlist)
    yield takeLeading(actions.getUser.toString(), getUser)
    yield takeLeading(actions.updateCart.toString(), updateCartList)
    yield takeLeading(actions.updateOrders.toString(), updateOrders)
    yield takeLeading(actions.addAddress.toString(), addAddress)
    yield takeLeading(actions.LoggedAsPartner.toString(),loggedAsPartner)
    // yield takeLeading(actions.getOrders.toString(),getOrders)

}