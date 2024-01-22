import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from 'assets/alllll'
import FavoriteSvg from 'assets/svg/FavoriteSvg'
import HomeSvg from 'assets/svg/HomeSvg'
import OrdersSvg from 'assets/svg/OrdersSvg'
import UserSvg from 'assets/svg/UserSvg'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Home from 'screens/Dashboard/Home'
import Favorite from 'screens/Favorite/Fovorite'
import Orders from 'screens/Orders/Orders'
import Profile from 'screens/Profile/Profile'
import Header from 'src/components/Header'
import { DashboardScreens, NameFormatter } from 'utils/all'



const BottomNavigationScreenArray = [
    {
        name: DashboardScreens.HOME,
        component: Home,
        icon: (p: any) => <HomeSvg {...p} />
    },
    {
        name: DashboardScreens.FAVORITE,
        component: Favorite,
        icon: (p: any) => <FavoriteSvg {...p} />
    },
    {
        name: DashboardScreens.PROFILE,
        component: Profile,
        icon: (p: any) => <UserSvg {...p} />
    },
    {
        name: DashboardScreens.ORDERS,
        component: Orders,
        icon: (p: any) => <OrdersSvg {...p} />
    },
]
const BottomTabNavigator = () => {
    const BottomNavigator = createBottomTabNavigator();

    return (
        <BottomNavigator.Navigator initialRouteName={DashboardScreens.HOME}
            screenOptions={{
                tabBarStyle: styles.tabBarContainer,
                tabBarShowLabel: false,
                headerStyle: { backgroundColor: colors.colorBackground, borderWidth: 0, borderBottomColor: colors.colorBackground },
                header: (e) => <Header {...e} />
            }}>
            {BottomNavigationScreenArray.map((d, i) => (
                <BottomNavigator.Screen
                    key={i}
                    name={d.name}
                    component={d.component}
                    options={({ navigation }) => {
                        const index = navigation.getState().index
                        return {
                            tabBarIcon: () => <View style={[styles.iconsContainer, index === i ? styles.focusedIcon : {}]} >{d.icon({ color: index === i ? colors.colorRed : colors.colorGreyMore })}</View>,
                            title: NameFormatter(d.name),
                            headerTitleStyle: { color: colors.colorPrimary, fontWeight: '700' }
                        }
                    }}
                />))}

        </BottomNavigator.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    iconsContainer: {
        // height: scaler(35),
        // width: scaler(35),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 50,
        // backgroundColor: colors.colorBackground

    },
    focusedIcon: {
        shadowColor: colors.colorRed,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 10
    },
    tabBarContainer: {
        backgroundColor: colors.colorBackground,
        borderTopWidth: 0,
        shadowColor: colors.colorGreyMore,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0,
        shadowRadius: 15,
        backfaceVisibility: 'hidden',
        // paddingVertical: scaler(15)
    }
})