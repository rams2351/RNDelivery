import axios, { AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig, Method } from "axios";
import React, { MutableRefObject } from "react";
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


function interceptResponse(res: AxiosResponse<any, any>): any {
    try {
        if (JSON.stringify(res?.data).startsWith("<") || JSON.stringify(res?.data).startsWith("\"<")) {
            setTimeout(() => {
                console.log('if');
                console.log('Internal Server Error')
            }, 500)
        } else if (res?.data?.status == 401) {
            console.log('else if');

            if (!TOKEN_EXPIRED.current) {
                TOKEN_EXPIRED.current = true
            }
        }
        else {
            return res?.data
        }
    }
    finally {
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


api.interceptors.request.use(async function (requestConfig: InternalAxiosRequestConfig<any>) {
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
        //@ts-ignore
        return interceptResponse(response)
    },
    async function (error) {
        //@ts-ignore
        return interceptResponse(error?.response)
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
    return api.request({
        method: method,
        url: url,
        data: body,
    })
}




export const testing = () => {
    return callApi('vw6bdfrm92pcnguv', 'GET')
}

export const _validateUser = (body: any) => {
    return callApi('vw6bdfrm92pcnguv/find-one?where=', 'GET', { where: body })
}

export const _addUser = async (body: any) => {
    return callApi('vw6bdfrm92pcnguv', 'POST', body)
}