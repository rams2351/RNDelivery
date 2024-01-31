import axios, { AxiosRequestHeaders, AxiosResponse, Method } from "axios";
import React, { MutableRefObject } from "react";
import { AuthScreens } from "utils/Constant";
import { NavigationService } from "utils/NavigationService";
import { _showErrorMessage } from "utils/Utils";
import { config } from "./config";


interface header extends AxiosRequestHeaders {
    Accept?: string;
    "Content-Type"?: string;
    Authorization: string | undefined;
    "X-Platform-Type": string;
    "Accept-Language": string;
}

interface IApiResponse {
    status: number;
    message?: string;
    data?: any;
    [key: string]: any
}



export const TOKEN_EXPIRED: MutableRefObject<boolean | null> = React.createRef()


function interceptResponse(res: AxiosResponse) {
    try {
        if (JSON.stringify(res?.data).startsWith("<") || JSON.stringify(res?.data).startsWith("\"<")) {
            setTimeout(() => {
                console.log('if');
                console.log('Internal Server Error')
            }, 500)
        } else if (res?.data?.status == 401) {
            console.log('else if');
            _showErrorMessage('Unauthorize please login with your credentials!')
            NavigationService.navigate(AuthScreens.GET_STARTED_SCREEN)
            if (!TOKEN_EXPIRED.current) {
                TOKEN_EXPIRED.current = true
            }
        }
        else {
            return res?.data
        }
    }
    finally {
        return res?.data
    }


}

const api = axios.create({
    baseURL: config.BASE_URL,
    timeout: 1000 * 30,
    headers: {
        'cache-control': 'no-cache',
        'xc-token': config.XC_TOKEN,
    }
});


api.interceptors.request.use(async function (requestConfig) {
    const isMultipart = (requestConfig.data && requestConfig.data instanceof FormData) ? true : false

    try {
        if (requestConfig.headers) {
            requestConfig.headers['Content-Type'] = (isMultipart) ? "multipart/form-data" : "application/json"
        }
    } finally {
        return requestConfig
    }
})

api.interceptors.response.use(
    async function (response) {
        return interceptResponse.call(response, response)
    },
    async function (error) {
        //@ts-ignore
        return await interceptResponse.call(error?.response)
    }
);
const objectToParamString = (obj: any) => {
    return (obj) ? Object.entries(obj).map(([k, v]: any) => v ? (`${k}=${encodeURIComponent(v)}`) : "").join("&") : '';
}

export async function callApi(url: string, method?: Method, body?: any): Promise<IApiResponse> {
    if (method == 'GET' && body) {
        url = url + '?' + objectToParamString(body)
        body = undefined
    }


    return await api.request({
        method: method,
        url: url,
        data: body,
    })
}




export const testing = () => {
    return callApi('mb53d0474hdwdy8/views/vw6bdfrm92pcnguv', 'GET')
}

export const _getAllUsers = () => {
    return callApi(`mb53d0474hdwdy8/views/vw6bdfrm92pcnguv`, 'GET')
}

export const _validateUser = (body: any) => {
    return callApi('mb53d0474hdwdy8/views/vw6bdfrm92pcnguv/find-one?where=', 'GET', { where: body })
}

export const _addUser = async (body: any) => {
    return callApi('mb53d0474hdwdy8/views/vw6bdfrm92pcnguv', 'POST', body)
}

export const _getAllProducts = async () => {
    return callApi('msa8dpk9qcum5x5/views/vwijvawnuny1a96u', 'GET')
}

export const _getProduct = async (body: any) => {
    return callApi('msa8dpk9qcum5x5/views/vwijvawnuny1a96u/find-one?where=', 'GET', { where: body })
}

export const _updateWishlist = async (body: any) => {
    return callApi(`mb53d0474hdwdy8/views/vw6bdfrm92pcnguv/${body?.id}`, 'PATCH', body)
}

export const _getProductsByCategory = async (body: any) => {
    return callApi(`msa8dpk9qcum5x5/views/${body}`, 'GET')
}

export const _getOrderList = async () => {
    return callApi(`mer2hygg6gpz5f9/views/vw8szicwpw1zf98s`, 'GET')
}

export const _addOrder = async (body: any) => {
    return callApi(`mer2hygg6gpz5f9/views/vwzuzgz0qe2je497`, 'POST', body)
}

export const _getOrders = async () => {
    return callApi(`mer2hygg6gpz5f9/views/vwzuzgz0qe2je497`, 'GET')
}

export const _getPlacedOrders = async () => {
    return callApi(`pihvvyikhuujsw4/mer2hygg6gpz5f9/views/vw8szicwpw1zf98s`, 'GET')
}