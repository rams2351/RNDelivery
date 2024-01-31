import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'assets/Colors'
import React from 'react'
import Dashboard from 'screens/DeliveryPartner/Dashboard'
import Tracking from 'screens/DeliveryPartner/Tracking'

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
    return (
        <PartnerStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {PartnerScreens.map((d, i) => (<PartnerStack.Screen
                options={{ cardStyle: { backgroundColor: colors.colorBackground } }}
                name={d.name} component={d.component} key={i} />))}
        </PartnerStack.Navigator>
    )
}

export default PartnerNavigator