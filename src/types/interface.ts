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
    user: IUser;
}

export interface Action<P = any, T = any> {
    type: T,
    payload: P,
}

export interface ProductsSlice{
    products: IProduct[];
    productDetail: IProduct;
    categoryProducts: IProduct[];
}

export interface DeliverySlice{
    allUsers: IUser[],
    ordersList: IAssignedOrder[],
     orderDetail: IAssignedOrder,
    driverInfo: IUser
}

export interface IUser {
    Id: number;
    firstName: string;
    lastName: string;
    cart: ICartProduct[];
    driverLocation: IDriverLocation;
    deliveryPartner: number;
    assignedOrder: IAssignedOrder;
    countryCode: string;
    email: string;
    phone: string;
    image: any[];
    address: IAddress[];
    dob: string;
    wishlist: number[];
    currentAddress:IAddress

}

export interface IDriverLocation extends ILatLng{
    route : ILatLng[]
}

export interface IProduct{
    Id: number;
    name: string;
    veg: number;
    img: any[];
    category: string;
    price: number;
    description: string;
    prepTime: number;
    origin: string;
}

export interface ICartProduct extends IProduct{
    qty: number;
}

export interface IAssignedOrder {
    Id: number;
    userId: number;
    status: 'placed'| 'dispatched'|'delivered' | 'cancelled'  ;
    orderFrom: string;
    paymentMethod: 'Card' | 'Bank' | 'Paypal' | 'COD';
    driverId: number;
    contact: number;
    timeToDeliver: number;
    products: IProduct[];
    deliverTo: IAddress;
    orderTime: {
        date: string;
        time: string;
        day: string;
    }
}

export interface ILatLng {
    latitude: number;
    longitude: number;
}

export interface IAddress {
    address: string;
    location: ILatLng;
    phone: string;
}