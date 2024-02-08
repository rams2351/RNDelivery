import { call, put, takeLeading } from "redux-saga/effects";
import * as ApiProvider from 'src/api/ApiProvider';
import { Action } from "src/types/interface";
import { _showErrorMessage } from "utils/Helpers";
import { actions } from "../slices/reducer";

function* getAllProducts({payload:{loader}}:Action<any>):Generator<any,any,any>{
    loader(true)
    try {
        let res = yield call(ApiProvider._getAllProducts)
        if (res) {
            yield put(actions.setProducts(res))
        }
        loader(false)
    }
    catch (err) {
    loader(false)
        _showErrorMessage("Something wrong in get All Products saga")
    }
}

function* getProductDetail({ payload }: Action<any>):Generator<any,any,any> {
    yield put(actions.setLoading(true))

    try {
        let res = yield call(ApiProvider._getProduct, payload)
        if (res) {
            yield put(actions.setProductDetail(res))
        }
        yield put(actions.setLoading(false))
    }
    catch (err) {
        console.log(err, 'in  getProduct detail saga');
        _showErrorMessage('Something went wrong in getProductDetail')

    }
}

function* getProductByCategory({ payload: { link, loader } }: Action<any>): Generator<any, any, any> {

    // yield put(actions.setLoading(true))
    loader(true)
    try {
        let res = yield call(ApiProvider._getProductsByCategory, link)
         if (res) {
            yield put(actions.setCategoryProducts(res))
         }
    loader(false)
    }
    catch (err) {
        console.log(err, 'in  getProductCategory detail saga');
        _showErrorMessage('Something went wrong in getProductDetail')
        loader(false)
    }
}


export default function* watchProducts() {
    yield takeLeading(actions.getAllProducts.toString(), getAllProducts)
    yield takeLeading(actions.getProductDetail.toString(), getProductDetail)
    yield takeLeading(actions.getProductsByCategory.toString(),getProductByCategory)
}