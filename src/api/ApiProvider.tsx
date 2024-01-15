import axios, { AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig, Method } from "axios";
import React, { MutableRefObject } from "react";
import { _showErrorMessage } from "utils";

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

const Config = {
    BASE_URL: config.BASE_URL,
    API_VERSION: '/api/v1/',
    APP_VERSION: 0.1
}

export const TOKEN_EXPIRED: MutableRefObject<boolean | null> = React.createRef()


function interceptResponse(response: AxiosResponse<any>): any {
    console.log(config.NOCO_DB_TOKEN, 'hello');

    try {
        if (JSON.stringify(response.data).startsWith("<") || JSON.stringify(response.data).startsWith("\"<")) {
            // DeviceEventEmitter.emit('STOP_LOADER_EVENT');
            setTimeout(() => {
                _showErrorMessage('Internal Server Error')
            }, 500);
        } else if (response?.data?.status == 401) {
            if (!TOKEN_EXPIRED.current) {
                TOKEN_EXPIRED.current = true
                // DeviceEventEmitter.emit("TOKEN_EXPIRED")
                _showErrorMessage(response?.data?.message)
            }
        } else {
            return response?.data
        }
    } finally {

    }
}

const api = axios.create({
    baseURL: Config.BASE_URL + Config.API_VERSION,
    timeout: 1000 * 30,
    headers: {
        'Accept': "application/json",
        'X-Platform-Type': 'app',
        // 'APP-VERSION': Config.APP_VERSION,
        'xc-auth': config.NOCO_DB_TOKEN
    }
});


api.interceptors.request.use(async function (requestConfig: InternalAxiosRequestConfig<any>) {
    return requestConfig
})

api.interceptors.response.use(
    async function (response) {
        //@ts-ignore
        return interceptResponse.call(response)
    },
    async function (error) {
        //@ts-ignore
        return interceptResponse.call(error?.response)
    }
);

async function apiRequest(url: string, header: header, body: any, method?: Method): Promise<IApiResponse> {
    return api.request({
        method,
        url,
        data: body,
        headers: header,
        params: { offset: '0', limit: '25', where: '' }
    })
}

async function callApi(url: string, method?: Method, body?: any) {
    const isMultipart = (body && body instanceof FormData) ? true : false
    const authToken = ''
    try {
        const header = {
            "Content-Type": (isMultipart) ? "multipart/form-data" : "application/json",
            Authorization: authToken ? ("Bearer " + authToken) : undefined,
            "X-Platform-Type": 'android',
            "Accept-Language": 'en'
        }
        return apiRequest(url, header as any, body, method)
    } catch (error: any) {
        throw new Error(error)
    }
}


export const testing = () => {
    callApi('vw6bdfrm92pcnguv', 'GET')
}