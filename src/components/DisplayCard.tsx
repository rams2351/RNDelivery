import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from 'src/assets/Colors'
import { scaler } from 'utils/Scaler'
import { CurrencyFormatter } from 'utils/Utils'

const DisplayCard = (props: any) => {
    const { name, img, price, onPress, Id: id } = props

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={(e) => onPress ? onPress(id) : null}>
            <View style={styles.imageContainer}>
                <Image src={img[0]?.signedUrl} style={styles.image} />
            </View>
            <View style={{
                display: 'flex',
                flexShrink: 1,
                paddingHorizontal: scaler(13),

            }} >
                <Text style={styles.text} numberOfLines={1} >{name}</Text>
                <View>
                    <Text style={styles.price} >{CurrencyFormatter(price)}</Text>

                </View>
            </View>

        </TouchableOpacity>
    )
}

export default DisplayCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.colorWhite,
        padding: scaler(15),
        borderRadius: 25,
        shadowColor: colors.colorBlack,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: scaler(20),
        alignItems: 'center'
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
})