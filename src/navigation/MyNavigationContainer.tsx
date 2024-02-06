import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'assets/alllll'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import OtpScreen from 'screens/auth/Otp/GetOtp'
import VerifyOtp from 'screens/auth/Otp/VerifyOtp'
import SignUp from 'screens/auth/Signup/SignUp'
import Loader from 'src/components/Loader'
import GetStartScreen from 'src/screens/auth/Starting'
import { AppState } from 'src/types/interface'
import { AuthScreens } from 'utils/all'
import DashboardNavigator from './DashboardNavigator'
import PartnerNavigator from './PartnerNavigator'

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
    },
    {
        name: AuthScreens.SIGN_UP,
        component: SignUp
    },
]
const AuthStack = createStackNavigator()

const Navigator = () => {
    const { isLogin, user } = useSelector((state: AppState) => (
        {
            isLogin: state.auth.isLogin,
            user: state.user.user
        }), shallowEqual
    )
    return (
        <>

            {isLogin ? user.deliveryPartner == 1 ? <PartnerNavigator /> : <DashboardNavigator /> : (
                <AuthStack.Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyle: { backgroundColor: colors.colorBackground }
                    }} initialRouteName={AuthScreens.GET_STARTED_SCREEN}>
                    {AuthScreensArray.map((d, i) => (<AuthStack.Screen
                        name={d.name}
                        component={d.component}
                        key={i} />))}
                </AuthStack.Navigator>
            )}
            <Loader />
        </>
    )
}

export default Navigator

