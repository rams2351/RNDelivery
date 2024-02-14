import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import Card from 'src/components/Card'
import SummaryDetail from 'src/components/checkout/SummaryDetail'
import CustomHeader from 'src/components/CustomHeader'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { getCurrentDateTime } from 'utils/Helpers'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'

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
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [changeAddressModal, setChangeAddressModal] = useState<boolean>(false)
    const { cart, user } = useSelector((state: AppState) => ({
        cart: state.user.user?.cart,
        user: state.user.user
    }), shallowEqual)
    const dispatch = useDispatch()

    const paymentHandler = useCallback(() => {
        dispatch(actions.setLoading(true))
        let interval = setTimeout(() => {
            NavigationService.replace(DashboardScreens.PAYMENT_SUCCESS)
            let additionalData = {
                userId: user.Id,
                orderTime: getCurrentDateTime(),
                orderFrom: cart[0]?.origin,
                status: 'placed',
                deliverTo: user.currentAddress,
                paymentMethod: paymentMethod,
                products: cart,
                contact: user?.currentAddress?.phone,
                timeToDeliver: cart.reduce((current: any, next: any) => {
                    return current += next.prepTime
                }, 0) + 15
            }
            dispatch(actions.getOrderList())
            dispatch(actions.updateOrders(additionalData))
            dispatch(actions.setLoading(false))
        }, 5000)
        return () => clearInterval(interval)
    }, [user, cart, paymentMethod])
    return (
        <>
            <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.colorBackground }} >
                <CustomHeader title='Checkout' />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={styles.methodText}>Deliver to:</Text>
                        <Card
                            style={styles.deliveredContainer}
                        >
                            {user?.address[0].location || user.currentAddress ? <>
                                <View style={styles.addressContainer}>
                                    <Ionicons name="location" size={20} color={colors.colorFocus} style={{}} />
                                    <Text style={styles.addressText}> {(user?.currentAddress?.address ?? user?.address[0]?.address)}</Text>
                                </View>
                                <View style={styles.underline} />
                            </> : null}
                            <TouchableOpacity
                                style={styles.addAddressContainer}
                                activeOpacity={0.5}
                                onPress={() => NavigationService.push(DashboardScreens.CHANGE_ADDRESS)}
                            >
                                <Icon name='change-circle' style={{}} size={20} color={colors.colorFocus} />
                                <Text style={styles.addNewText}> Change Address</Text>
                            </TouchableOpacity>

                        </Card>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.methodText}>Order Summary:</Text>
                        <Card
                            style={styles.deliveredContainer}
                        >
                            <SummaryDetail list={cart} />

                        </Card>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.methodText}>Payment Method</Text>
                        <Card
                            style={styles.cardContainer}
                        >
                            {
                                Methods.map((d, i) => (
                                    <TouchableOpacity key={i}  >
                                        <TouchableOpacity key={i} style={styles.methodsContainer} activeOpacity={0.5} onPress={() => setPaymentMethod(d.name)} >
                                            {paymentMethod === d.name ? <Image source={Images.ic_check} style={[styles.paymentImage]} /> : <Image source={Images.ic_uncheck} style={[styles.paymentImage]} />}

                                            <View style={[styles.imageContainer, { backgroundColor: d.color }]}>
                                                <Image source={d.icon} style={styles.paymentImage} />
                                            </View>
                                            <Text style={styles.paymentText}>{d.name}</Text>
                                        </TouchableOpacity>
                                        <View style={styles.underline} />
                                    </TouchableOpacity>))
                            }

                        </Card>
                    </View>

                </ScrollView>

                <Button title="Complete Order"
                    buttonStyle={{
                        marginHorizontal: scaler(20),
                        marginBottom: scaler(10)
                    }}
                    onPressButton={paymentHandler}
                    disabled={paymentMethod.length == 0}
                />
            </SafeAreaView>

        </>
    )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        paddingVertical: scaler(20),
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
        marginBottom: scaler(15),
    },

    addressContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaler(10),
        flexShrink: 1
    },
    deliveredContainer: {
        backgroundColor: colors.colorWhite,
        padding: scaler(15),
    },
    addressText: {
        fontWeight: '500',
        marginLeft: scaler(5)
    },
    addAddressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.colorFocus,
        paddingHorizontal: scaler(15),
        paddingVertical: scaler(5),
        borderRadius: scaler(8),
    },
    addNewText: {
        fontSize: scaler(12),
        fontWeight: '500',
        color: colors.colorFocus
    }
})