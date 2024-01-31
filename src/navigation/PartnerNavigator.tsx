import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'assets/Colors'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import Dashboard from 'screens/DeliveryPartner/Dashboard'
import Tracking from 'screens/DeliveryPartner/Tracking'
import { AppState } from 'src/types/interface'

const PartnerScreens = [
    {
        name: 'Home',
        component: Dashboard
    },
    {
        name: 'Tracking',
        component: Tracking
    }
]

const PartnerNavigator = () => {
    const PartnerStack = createStackNavigator()

    const { user } = useSelector((state: AppState) => ({ user: state.user.user }), shallowEqual)
    return (
        <PartnerStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {user?.assignedOrders?.Id ? <PartnerStack.Screen
                options={{ cardStyle: { backgroundColor: colors.colorBackground } }}
                name={'tracking'} component={Tracking} /> : <PartnerStack.Screen
                options={{ cardStyle: { backgroundColor: colors.colorBackground } }}
                name={'Dashboard'} component={Dashboard} />}
        </PartnerStack.Navigator>
    )
}

export default PartnerNavigator