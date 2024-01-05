import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Login from 'screens/auth/Login/Login'
import OtpScreen from 'screens/auth/Otp/OtpScreen'
import SignUp from 'screens/auth/Signup/SignUp'
import Home from 'screens/Dashboard/Home'
import GetStartScreen from 'src/screens/auth/Starting'
import { AuthScreens, DashboardScreens } from 'src/utils/Constants'

const Navigator = () => {
    const IS_LOGIN = false

    const AuthStack = createStackNavigator()
    return (
        <>
            {IS_LOGIN ? <DashboardNavigator /> : (
                <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                    <AuthStack.Screen name={AuthScreens.GET_STARTED_SCREEN} component={GetStartScreen} />
                    <AuthStack.Screen name={AuthScreens.SIGN_UP} component={SignUp} />
                    <AuthStack.Screen name={AuthScreens.LOGIN} component={Login} />
                    <AuthStack.Screen name={AuthScreens.OTP_SCREEN} component={OtpScreen} />
                </AuthStack.Navigator>
            )}
        </>
    )
}

export default Navigator

const DashboardNavigator = () => {
    const BottomNavigator = createBottomTabNavigator()
    return (
        <BottomNavigator.Navigator>
            <BottomNavigator.Screen name={DashboardScreens.HOME} component={Home} />
        </BottomNavigator.Navigator>
    )
}