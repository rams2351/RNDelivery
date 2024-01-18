import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import Favorite from 'screens/Favorite/Fovorite'
import { DashboardScreens, scaler } from 'utils/all'
import BottomTabNavigator from './BottomTabNavigator'

const DashboardScreensArray = [
    {
        name: 'BottomNavigation',
        component: BottomTabNavigator
    },
    {
        name: DashboardScreens.PRODUCT_DETAIL,
        component: Favorite
    }
]

const DashboardNavigator = () => {
    const StackNavigator = createStackNavigator();
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