import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from 'src/components/Button'
import Text from 'src/components/Text'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'

const PaymentSuccess = ({ navigation }: any) => {

    return (
        <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.colorBackground }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={Images.ic_success_gif} style={styles.image} />
                </View>
                <Text style={styles.text}>Order Placed Successfully!</Text>
            </View>

            <Button title="Track order" buttonStyle={styles.button}
                onPressButton={() => NavigationService.replace(DashboardScreens.BOTTOM_NAVIGATOR, { screen: DashboardScreens.ORDERS })}
            />

            <Button title="Continue ordering" buttonStyle={styles.button}
                onPressButton={() => navigation.popToTop()}
            />
        </SafeAreaView>
    )
}

export default PaymentSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'green',
        overflow: 'hidden'
    },
    image: {
        borderRadius: 100,
        height: scaler(150),
        width: scaler(150),

    },
    text: {
        fontSize: scaler(25),
        fontWeight: '600',
        color: 'green',
        marginTop: scaler(25),
        paddingHorizontal: scaler(15)
    },
    button: {
        marginHorizontal: scaler(20),
        marginBottom: scaler(20)
    }
})