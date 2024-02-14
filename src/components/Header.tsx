import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback } from 'react'
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'
import Text from './Text'

const Header = (props: BottomTabHeaderProps) => {
    const { user } = useSelector((state: AppState) => ({
        user: state.user.user
    }), shallowEqual)

    const cartItem = user?.cart?.length
    const dispatch = useDispatch()
    const handleCartRoute = useCallback(() => {
        NavigationService.push(DashboardScreens.CART)
    }, [])
    return (
        <>
            <SafeAreaView style={{ backgroundColor: colors.colorBackground }} edges={['top']} />
            <View style={styles.container}>
                <Text style={styles.text}>{props?.options?.title}</Text>
            </View>
            {cartItem ? (<TouchableOpacity style={styles.cartContainer} activeOpacity={0.7} onPress={handleCartRoute}>
                <Image source={Images.ic_cart_white} style={styles.cartImage} />
            </TouchableOpacity>) : null}
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scaler(15),
        backgroundColor: colors.colorBackground
    },
    text: {
        fontSize: scaler(15),
        color: colors.colorPrimary,
        fontWeight: '800'

    },
    cartContainer: {
        position: 'absolute',
        backgroundColor: colors.colorPrimary,
        top: Platform.OS === 'android' ? 12 : 55,
        right: 30,
        padding: 10,
        borderRadius: 50
    },
    cartImage: {
        height: scaler(22),
        width: scaler(22)
    }
})