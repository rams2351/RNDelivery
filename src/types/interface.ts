export interface AppState {
     auth:AuthSlice
}


export interface AuthSlice {
    user: any
    isLogin: boolean;
}

export interface Action<P = any, T = any> {
    type: T,
    payload: P,
}