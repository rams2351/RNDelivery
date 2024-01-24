import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import CardView from 'src/components/CardView'
import CustomHeader from 'src/components/CustomHeader'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'
import { CurrencyFormatter } from 'utils/Utils'

const Methods = [
    {
        name: 'Card',
        icon: Images.ic_card,
        color: 'rgba(244, 123, 10, 1)'
    },
    {
        name: 'Bank',
        icon: Images.ic_bank,
        color: 'rgba(235, 71, 150, 1)'
    },
    {
        name: 'Paypal',
        icon: Images.ic_paypal,
        color: 'rgba(0, 56, 255, 1)'
    },

]

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState<string>('Card')
    const { cart, user } = useSelector((state: AppState) => ({
        cart: state.user.user?.cart,
        user: state.user.user
    }), shallowEqual)
    const dispatch = useDispatch()
    let total = 0
    cart?.forEach((_: any) => {
        total += _.price * _.qty
    })

    const paymentHandler = useCallback(() => {
        dispatch(actions.setLoading(true))


        setTimeout(() => {
            NavigationService.push(DashboardScreens.PAYMENT_SUCCESS)
            let pay = []
            if (user?.orders?.length) {
                pay = [...user.orders, { ...cart }]
            } else {
                pay = [{ ...cart }]
            }
            dispatch(actions.setLoading(false))
            dispatch(actions.updateOrders({ id: user.Id, list: pay }))
        }, 5000)
    }, [user, cart])
    return (
        <>
            <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.colorBackground }} >
                <CustomHeader title='Checkout' />
                <View style={styles.container}>
                    <Text style={styles.methodText}>Payment Method</Text>

                    <CardView
                        cardElevation={3}
                        cardMaxElevation={2}
                        cornerRadius={15}
                        style={styles.cardContainer}
                    >
                        {
                            Methods.map((d, i) => (<>
                                <TouchableOpacity key={i} style={styles.methodsContainer} activeOpacity={0.5} onPress={() => setPaymentMethod(d.name)} >
                                    {paymentMethod === d.name ? <Image source={Images.ic_check} style={[styles.paymentImage]} /> : <Image source={Images.ic_uncheck} style={[styles.paymentImage]} />}


                                    <View style={[styles.imageContainer, { backgroundColor: d.color }]}>
                                        <Image source={d.icon} style={styles.paymentImage} />
                                    </View>
                                    <Text style={styles.paymentText}>{d.name}</Text>
                                </TouchableOpacity>
                                <View style={styles.underline} />
                            </>))
                        }
                    </CardView>
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.methodText}>Total</Text>
                    <Text style={styles.methodText}>{CurrencyFormatter(total)}</Text>
                </View>
                <Button title="Complete Order"
                    buttonStyle={{
                        marginHorizontal: scaler(20),
                        marginBottom: scaler(20)
                    }}
                    onPressButton={paymentHandler}
                />
            </SafeAreaView>
        </>
    )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        paddingTop: scaler(25),
        marginHorizontal: scaler(20),
        flex: 1
    },
    methodText: {
        fontWeight: '600',
        fontSize: scaler(20),
        marginBottom: scaler(20)
    },
    paymentText: {
        fontWeight: '600',
        fontSize: scaler(15),
    },
    cardContainer: {
        backgroundColor: colors.colorWhite,
        padding: scaler(20),
    },
    imageContainer: {
        width: scaler(50),
        height: scaler(50),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaler(10),
        marginHorizontal: scaler(15)
    },
    methodsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaler(10),

    },
    paymentImage: {
        height: scaler(20),
        width: scaler(20)
    },
    underline: {
        borderBottomWidth: 1,
        borderColor: colors.colorGreyText,
        marginBottom: scaler(10),
    },
    totalContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: scaler(25),

    }
})