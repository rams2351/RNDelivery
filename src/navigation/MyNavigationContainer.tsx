import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'
import OtpScreen from 'screens/auth/Otp/GetOtp'
import VerifyOtp from 'screens/auth/Otp/VerifyOtp'
import SignUp from 'screens/auth/Signup/SignUp'
import Loader from 'src/components/Loader'
import GetStartScreen from 'src/screens/auth/Starting'
import { AppState } from 'src/types/interface'
import { AuthScreens } from 'utils'
import DashboardNavigator from './DashboardNavigator'

const AuthScreensArray = [
    {
        name: AuthScreens.GET_STARTED_SCREEN,
        component: GetStartScreen
    },
    {
        name: AuthScreens.GET_OTP,
        component: OtpScreen
    },
    {
        name: AuthScreens.VERIFY_OTP,
        component: VerifyOtp
    }, {
        name: AuthScreens.SIGN_UP,
        component: SignUp
    },
]

const Navigator = () => {
    const AuthStack = createStackNavigator()
    const { isLoading, isLogin } = useSelector((state: AppState) => {
        return {
            isLoading: state.extra.loading,
            isLogin: state.auth.isLogin
        }
    })
    return (
        <>
            {isLoading ? <Loader /> : null}
            {isLogin ? <DashboardNavigator /> : (
                <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={AuthScreens.GET_STARTED_SCREEN}>
                    {AuthScreensArray.map((d, i) => (<AuthStack.Screen name={d.name} component={d.component} key={i} />))}
                </AuthStack.Navigator>
            )}
        </>
    )
}

export default Navigator

