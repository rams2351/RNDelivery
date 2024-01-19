import { colors } from 'assets/Colors';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CurrencyFormatter } from 'utils/all';
import { scaler } from 'utils/Scaler';

interface ItemDisplayCardProp {
    img: string;
    title: string;
    price: string;
    onPressItem: (e: any) => void;
}

const ItemDisplayCard: React.FC<ItemDisplayCardProp> = (props) => {
    const { img, title, onPressItem, price } = props

    return (
        <TouchableOpacity style={styles.container} onPress={onPressItem} activeOpacity={0.6}>
            <Image src={img} style={styles.image} />
            <View style={styles.textContainer}>
                <Text numberOfLines={3} style={styles.text}>{title}</Text>
                <Text style={styles.price}>{CurrencyFormatter(price)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemDisplayCard

const styles = StyleSheet.create({
    container: {
        height: scaler(230),
        width: scaler(190),
        backgroundColor: colors.colorWhite,
        borderRadius: 30,
        shadowColor: colors.colorGreyMore,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        display: 'flex',
        position: 'relative',
        marginTop: scaler(60),
        marginBottom: scaler(15),
        justifyContent: 'flex-end',
        alignItems: 'center',
        // marginRight: scaler(30)
    },
    image: {
        height: scaler(110),
        width: scaler(110),
        borderRadius: 90,
        shadowColor: 'green',
        shadowOffset: { width: 10, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        position: 'absolute',
        top: -40,
        left: 45,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: colors.colorFocus,
    },
    text: {
        flexWrap: 'wrap',
        fontSize: scaler(20),
        textAlign: 'center',
        fontWeight: '700',
        paddingHorizontal: scaler(20),
        color: colors.colorBlackText,
        maxHeight: scaler(50),
    },
    price: {
        marginBottom: scaler(25),
        fontSize: scaler(20),
        fontWeight: '700',
        color: colors.colorPrimary
    },
    textContainer: {
        display: 'flex',
        flex: 1 / 2,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})