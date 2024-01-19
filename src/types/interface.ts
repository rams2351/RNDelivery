export interface AppState {
    auth: AuthSlice,
    extra: ExtraSlice,
    user: UserSlice,
    products:ProductsSlice,
}


export interface AuthSlice {
    isLogin: boolean;
}

export interface ExtraSlice{
    loading: boolean;
}

export interface UserSlice{
    user: any;
}

export interface Action<P = any, T = any> {
    type: T,
    payload: P,
}

export interface ProductsSlice{
    products: any[],
    productDetail: any,
}
