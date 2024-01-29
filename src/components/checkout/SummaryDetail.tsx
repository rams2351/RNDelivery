import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { scaler } from 'utils/Scaler'
import { CurrencyFormatter, TimeFormatter } from 'utils/Utils'
import Text from '../Text'


interface SummaryDetailsProps {
    list: any[];

}

const SummaryDetail: React.FC<SummaryDetailsProps> = (props) => {
    const { list } = props

    const dispatch = useDispatch()
    let total = 0
    list?.forEach((_: any) => {
        total += _.price * _.qty
    })
    const { user } = useSelector((state: AppState) => ({
        user: state.user.user
    }), shallowEqual)

    const listLength = list?.length


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
        console.log(pay);

        dispatch(actions.updateCart({ id: user?.Id, list: pay }))
    }, [user])

    let totalTime = 0
    list.forEach((d: any) => {
        totalTime += d.prepTime
    });

    return (
        <>
            {list?.map((d: any, i: number) => (
                <View key={i}>
                    <View style={styles.container}>
                        <View style={styles.productImageContainer}>
                            <Image source={Images.active_user} src={d.img[0]?.signedUrl} style={styles.image} />
                        </View>
                        <View style={styles.container1} >
                            <Text style={[styles.text, d?.qty ? { marginBottom: scaler(1) } : {}]} numberOfLines={1} >{d?.name}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <Text style={styles.qtyText}>Qty-{d?.qty}</Text>
                                <Text style={styles.price} >{d?.qty ? CurrencyFormatter(d?.qty * d.price) : CurrencyFormatter(d.price)}</Text>
                            </View>
                        </View>
                    </View>
                    {listLength == i ? null : <View style={styles.underline} />}
                </View>
            ))}
            <View style={styles.totalContainer}>
                <Text style={styles.methodText}>Total</Text>
                <Text style={styles.methodText}>{CurrencyFormatter(total)}</Text>
            </View>
            <View style={styles.deliveryInstruction}>
                <Icon name='infocirlce' size={17} color={colors.colorFocus} style={{}} />
                <Text style={styles.deliveredText}>Delivered in {TimeFormatter(totalTime + 15)}</Text>
            </View>
        </>

    )
}

export default SummaryDetail

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',

    },
    image: {
        height: scaler(50),
        width: scaler(50),
        borderRadius: 100,
    },
    productImageContainer: {
        height: scaler(50),
        width: scaler(50),
        borderRadius: 100,
        backgroundColor: colors.colorBackground,
        shadowColor: colors.colorBlack,
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        resizeMode: 'contain',
        zIndex: 55
    },
    container1: {
        display: 'flex',
        flexShrink: 1,
        paddingHorizontal: scaler(13),
        marginTop: 2

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
        fontSize: scaler(12),
        fontWeight: '500',
    },
    underline: {
        borderTopColor: colors.colorGreyMore,
        borderTopWidth: 1,
        marginVertical: scaler(10),
    },
    totalContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: scaler(10),
        paddingHorizontal: scaler(10)
    },
    methodText: {
        marginTop: 5,
        fontWeight: '600',
        fontSize: scaler(15),
    },
    deliveredText: {
        paddingHorizontal: scaler(10),
        fontSize: scaler(13)
    },
    deliveryInstruction: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaler(5)
    }
})


