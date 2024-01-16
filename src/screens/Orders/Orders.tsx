import { colors, Images } from 'assets'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Button'
import { scaler } from 'utils'

const Orders = ({ navigation }: any) => {
    const dispatch = useDispatch()
    return (
        <View style={{ backgroundColor: colors.colorBackground, flex: 1 }}>
            <View style={styles.container}>

                <Image source={Images.ic_order_bg} style={styles.image} />
                <Text style={styles.text}>No Orders yet</Text>
                <Text numberOfLines={2} style={styles.textDescription}>Hit the orange button down below to create an order</Text>

            </View>
            <Button
                onPressButton={() => {
                    navigation.push('other')
                }}
                title={'Start ordering'}
                buttonStyle={{
                    marginHorizontal: scaler(20),
                    marginBottom: scaler(20)
                }}
            />
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: scaler(100),
        width: scaler(100),
    },
    text: {
        fontSize: scaler(25),
        fontWeight: '700',
        color: colors.colorBlackText,
        marginTop: scaler(10)
    },
    textDescription: {
        paddingHorizontal: scaler(70),
        textAlign: 'center',
        marginTop: scaler(15),
        fontSize: scaler(14),
        // fontWeight: '600',
        color: colors.colorGreyMore
    }
})