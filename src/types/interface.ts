export interface AppState {
    auth: AuthSlice,
    extra: ExtraSlice,
    user: UserSlice,
    products: ProductsSlice,
    delivery:DeliverySlice
}


export interface AuthSlice {
    isLogin: boolean;
}

export interface ExtraSlice{
    loading: boolean;
}

export interface UserSlice{
    user: any;
    orders:any[]
}

export interface Action<P = any, T = any> {
    type: T,
    payload: P,
}

export interface ProductsSlice{
    products: any[],
    productDetail: any,
}

export interface DeliverySlice{
    allUsers: any[],
    ordersList:any[]
}