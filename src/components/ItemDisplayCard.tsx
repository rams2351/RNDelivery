import { colors } from 'assets/Colors';
import { Images } from 'assets/image';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scaler } from 'utils/Scaler';
import Text from './Text';
//@ts-ignore
import CardView from 'react-native-cardview';
import { CurrencyFormatter } from 'utils/Helpers';

interface ItemDisplayCardProp {
    img: string;
    title: string;
    price: string;
    onPressItem: (e: any) => void;
}

const ItemDisplayCard: React.FC<ItemDisplayCardProp> = (props) => {
    const { img, title, onPressItem, price } = props

    return (
        <TouchableOpacity onPress={onPressItem} activeOpacity={0.8}>
            <CardView
                cardElevation={3}
                cardMaxElevation={2}
                cornerRadius={25}
                style={styles.container}
                onPress={onPressItem}
                activeOpacity={0.6}
            >
                <View style={{
                    flex: 1, justifyContent: 'flex-end',
                    alignItems: 'center',

                }} >
                    <View style={styles.textContainer}>
                        <Text numberOfLines={3} style={styles.text}>{title}</Text>
                        <Text style={styles.price}>{CurrencyFormatter(price)}</Text>
                    </View>
                </View>
            </CardView>

            <Image source={Images.user} src={img} style={styles.image} />
        </TouchableOpacity>

    )
}

export default ItemDisplayCard

const styles = StyleSheet.create({
    container: {
        height: scaler(230),
        width: scaler(190),
        backgroundColor: colors.colorWhite,
        display: 'flex',
        position: 'relative',
    },
    image: {
        height: scaler(110),
        width: scaler(110),
        borderRadius: 90,
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