import { Images } from 'assets/image'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from 'src/assets/Colors'
import { scaler } from 'utils/Scaler'
import { CurrencyFormatter } from 'utils/Utils'
import Text from './Text'
//@ts-ignore
import CardView from 'react-native-cardview'
const DisplayCard = (props: any) => {
    const { name, img, price, onPress, Id: id, qty } = props

    return (
        <CardView
            cardElevation={3}
            cardMaxElevation={2}
            cornerRadius={15}
            style={styles.container}
        >
            <TouchableOpacity activeOpacity={0.5} style={styles.touchable} onPress={(e) => onPress ? onPress(id) : null}>
                <View style={styles.imageContainer}>
                    <Image source={Images.active_user} src={img[0]?.signedUrl} style={styles.image} />
                </View>
                <View style={{
                    display: 'flex',
                    flexShrink: 1,
                    paddingHorizontal: scaler(13),

                }} >
                    <Text style={[styles.text, qty ? { marginBottom: 5 } : {}]} numberOfLines={1} >{name}</Text>
                    <View>
                        <Text style={styles.price} >{qty ? CurrencyFormatter(qty * price) : CurrencyFormatter(price)}</Text>
                        {qty ? <Text style={styles.qtyText}>Qty-{qty}</Text> : null}
                    </View>
                </View>

            </TouchableOpacity>
        </CardView>

    )
}

export default DisplayCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.colorWhite,
        padding: scaler(15),
        // margin: scaler(20),
    },
    touchable: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        height: scaler(70),
        width: scaler(70),
        borderRadius: 100,
    },
    imageContainer: {
        height: scaler(70),
        width: scaler(70),
        borderRadius: 100,
        backgroundColor: colors.colorBackground,
        shadowColor: colors.colorBlack,
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        resizeMode: 'contain',
        zIndex: 55
    },
    text: {
        flexWrap: 'wrap',
        fontSize: scaler(15),
        fontWeight: '600',
        color: colors.colorBlackText,
        maxHeight: scaler(50),
        marginBottom: scaler(12)
    },
    price: {
        fontSize: scaler(15),
        fontWeight: '700',
        color: colors.colorPrimary,
    },
    qtyText: {
        fontWeight: '600'
    }
})