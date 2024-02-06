import { Images } from 'assets/image'
import React, { useCallback } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from 'src/assets/Colors'
import { CurrencyFormatter } from 'utils/Helpers'
import { scaler } from 'utils/Scaler'
import Text from './Text'
//@ts-ignore
import CardView from 'react-native-cardview'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
const DisplayCard = (props: any) => {
    const { name, img, price, onPress, Id: id, qty } = props

    const { user } = useSelector((state: AppState) => ({ user: state.user.user }), shallowEqual)
    const dispatch = useDispatch()



    const qtyHandler = useCallback((id: string, qty: number, type: string) => {
        let newQty = qty;
        if (type === "+") {
            newQty += 1
        } else {
            newQty -= 1
        }

        let pay = user?.cart.map((d: any) => {
            if (d.Id == id) {
                return {
                    ...d,
                    qty: newQty
                }
            } else return d
        })
        dispatch(actions.updateCart({ id: user?.Id, list: pay }))
    }, [user])

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
                <View style={styles.container1} >
                    <Text style={[styles.text, qty ? { marginBottom: 5 } : {}]} numberOfLines={1} >{name}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={styles.price} >{qty ? CurrencyFormatter(qty * price) : CurrencyFormatter(price)}</Text>
                        {qty ?
                            <TouchableOpacity style={styles.groupButtonContainer} onPress={() => { }} activeOpacity={1}>
                                <TouchableOpacity style={styles.actionButton} activeOpacity={0.7} onPress={() => qty > 1 ? qtyHandler(id, qty, '-',) : null} disabled={qty == 1}>
                                    <Text style={styles.actionText}>-</Text>
                                </TouchableOpacity>
                                <View style={styles.qtyContainer}>
                                    <Text style={styles.qtyText}>{qty}</Text>
                                </View>
                                <TouchableOpacity style={styles.actionButton} activeOpacity={0.7} onPress={() => qtyHandler(id, qty, '+')}>
                                    <Text style={styles.actionText}>+</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>


                            : null}
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
    groupButtonContainer: {
        borderRadius: scaler(10),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },

    actionButton: {
        backgroundColor: colors.colorPrimary,
        width: scaler(25),
        height: scaler(25),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.colorPrimary,
        borderWidth: 1,
        overflow: 'hidden'
    },
    qtyContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: scaler(25),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.colorPrimary,

    },
    actionText: {
        fontSize: scaler(15),
        fontWeight: '700',
        color: colors.colorWhite
    },
    qtyText: {
        fontSize: scaler(12),
        fontWeight: '500',
    },
    container1: {
        display: 'flex',
        flexShrink: 1,
        paddingHorizontal: scaler(13),
        marginTop: 2

    }
})