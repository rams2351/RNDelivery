import { useFocusEffect } from '@react-navigation/native'
import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import Card from 'src/components/Card'
import SummaryDetail from 'src/components/checkout/SummaryDetail'
import CustomHeader from 'src/components/CustomHeader'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { requestLocationPermission } from 'utils/GeoLocation'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'
import { getCurrentDateTime, _showErrorMessage } from 'utils/Utils'

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
    const [location, setLocation] = useState<any>()
    const { cart, user } = useSelector((state: AppState) => ({
        cart: state.user.user?.cart,
        user: state.user.user
    }), shallowEqual)
    const dispatch = useDispatch()


    useFocusEffect(useCallback(() => {
        if (!user?.location) {
            async function fetchLocation() {
                const hasPermission = await requestLocationPermission()
                if (hasPermission) {
                    Geolocation.getCurrentPosition(
                        position => {
                            const { latitude, longitude } = position.coords;
                            setLocation({ latitude, longitude })
                        },
                        error => _showErrorMessage(JSON.stringify(error)),
                        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                    );
                }
            }
            fetchLocation()
        }
    }, [user]))
    console.log(paymentMethod);

    const paymentHandler = useCallback(() => {

        dispatch(actions.setLoading(true))
        setTimeout(() => {
            NavigationService.replace(DashboardScreens.PAYMENT_SUCCESS)
            let totalTime = 0
            cart.forEach((d: any) => {
                totalTime += d.prepTime
            });
            let additionalData = {
                orderTime: getCurrentDateTime(),
                orderFrom: cart[0]?.origin.name,
                status: 'placed',
                deliverTo: user?.location
            }
            let pay = []
            if (user?.orders?.length) {
                pay = [...user.orders, { products: cart, ...additionalData }]
            } else {
                pay = [{ products: cart, ...additionalData }]
            }

            dispatch(actions.setLoading(false))
            dispatch(actions.updateOrders({ id: user.Id, list: pay }))
        }, 5000)
    }, [user, cart])
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
                            <View style={styles.addressContainer}>
                                <Icon name="location" size={20} color={colors.colorFocus} style={{}} />
                                <Text style={styles.addressText}> {user?.firstName + " " + (user?.address ?? '') + ", " + user?.phone}</Text>
                            </View>

                            <View style={styles.underline} />
                            {/* <View>
                                <Icon.Button name='add' style={{}} />
                            </View> */}

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
                            // onPressCard={() => { }}
                            touchableOpacity={1}
                        >
                            {
                                Methods.map((d, i) => (
                                    <TouchableOpacity key={i} onPress={() => { console.log('print') }} style={{ zIndex: 500 }} >
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

})