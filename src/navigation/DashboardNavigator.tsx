import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import Cart from 'screens/Cart/Cart'
import Checkout from 'screens/Checkout/Checkout'
import OrderDetail from 'screens/Orders/OrderDetail'
import PaymentSuccess from 'screens/Payment/PaymentSuccess'
import Practice from 'screens/Practice'
import ProductDetail from 'screens/ProductDetail'
import SearchScreen from 'screens/Search/SearchScreen'
import TrackingMap from 'screens/TrackingMap/TrackingMap'
import { DashboardScreens } from 'utils/Constant'
import { scaler } from 'utils/Scaler'
import BottomTabNavigator from './BottomTabNavigator'

const DashboardScreensArray = [
    {
        name: DashboardScreens.BOTTOM_NAVIGATOR,
        component: BottomTabNavigator
    },
    {
        name: DashboardScreens.PRODUCT_DETAIL,
        component: ProductDetail
    },
    {
        name: DashboardScreens.CART,
        component: Cart
    },
    {
        name: DashboardScreens.CHECKOUT,
        component: Checkout
    },
    {
        name: DashboardScreens.PAYMENT_SUCCESS,
        component: PaymentSuccess
    },
    {
        name: DashboardScreens.TRACKING_MAP,
        component: TrackingMap
    },
    {
        name: DashboardScreens.ORDER_DETAIL,
        component: OrderDetail
    },
    {
        name: DashboardScreens.SEARCH_SCREEN,
        component: SearchScreen
    }, {
        name: 'practice',
        component: Practice
    }
]
const StackNavigator = createStackNavigator();

const DashboardNavigator = () => {
    return (
        <StackNavigator.Navigator screenOptions={{
            headerShown: false,
        }} initialRouteName='BottomNavigation' >
            {DashboardScreensArray.map((d, i) => (
                <StackNavigator.Screen
                    name={d.name}
                    component={d.component}
                    key={i} />))}
        </StackNavigator.Navigator>

    )
}

export default DashboardNavigator;

const styles = StyleSheet.create({
    icon: { height: scaler(25), width: scaler(25), resizeMode: 'cover' }

})