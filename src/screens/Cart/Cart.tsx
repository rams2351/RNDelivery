import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React from 'react'
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shallowEqual, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import DisplayCard from 'src/components/DisplayCard'
import Text from 'src/components/Text'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'

const Cart = () => {
    const { cart } = useSelector((state: AppState) => ({
        cart: state?.user.user?.cart
    }), shallowEqual)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.colorBackground }}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => NavigationService.goBack()}
                ><Image source={Images.ic_right_icon} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.text}>Cart</Text>
            </View>
            <ScrollView style={{ padding: scaler(25) }}>
                {cart?.map((d: any, i: number) => (<DisplayCard onPress={(e: any) => NavigationService.push(DashboardScreens.PRODUCT_DETAIL, { id: e })} {...d} key={i} />))}
            </ScrollView>
            <View style={styles.buttonPriceContainer}>
                <Button
                    title="Checkout"
                    buttonStyle={{}}
                />
            </View>
        </SafeAreaView>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: scaler(15),
        backgroundColor: colors.colorBackground
    },
    text: {
        fontSize: scaler(15),
        color: colors.colorPrimary,
        fontWeight: '800',
        flex: 1,
        textAlign: 'center',

    },
    cartContainer: {
        position: 'absolute',
        backgroundColor: colors.colorPrimary,
        top: Platform.OS === 'android' ? 20 : 55,
        right: 30,
        padding: 10,
        borderRadius: 50
    },
    cartImage: {
        height: scaler(25),
        width: scaler(25)
    },
    backIcon: {
        height: scaler(28),
        width: scaler(28)
    },
    buttonPriceContainer: {
        marginVertical: scaler(15),
        marginHorizontal: scaler(25)
    },

})