import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import Text from 'src/components/Text'
import { AppState } from 'src/types/interface'
import { scaler } from 'utils/Scaler'

const PaymentSuccess = ({ navigation }: any) => {
    const { user } = useSelector((state: AppState) => ({
        user: state.user.user,
    }), shallowEqual)
    const dispatch = useDispatch()
    const cart = user?.cart
    // useEffect(() => {
    //     dispatch(actions.updateCart({ id: user?.Id, list: [] }))
    // }, [])
    return (
        <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.colorBackground }}>
            <View style={styles.container}>
                <Image source={Images.ic_success_gif} style={styles.image} />
                <Text style={styles.text}>Payment Success</Text>
            </View>
            <Button title="Continue ordering" buttonStyle={{
                marginHorizontal: scaler(20),
                marginBottom: scaler(20)

            }}
                onPressButton={() => navigation.popToTop()}
            />
        </SafeAreaView>
    )
}

export default PaymentSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        borderRadius: 100,
        height: scaler(150),
        width: scaler(150),
        borderWidth: 5,
        borderColor: 'green'
    },
    text: {
        fontSize: scaler(25),
        fontWeight: '600',
        color: 'green',
        marginTop: scaler(25)
    }
})