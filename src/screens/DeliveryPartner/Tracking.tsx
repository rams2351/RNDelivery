import { colors } from 'assets/Colors'
import React, { useCallback, useEffect, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import Card from 'src/components/Card'
import CustomHeader from 'src/components/CustomHeader'
import Popup from 'src/components/Popup'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { scaler } from 'utils/Scaler'

interface ICoordinates {
    latitude: number;
    longitude: number;
    routeCoordinates: any[]
}

export const coordinates: ICoordinates[] = [
    {
        latitude: 30.73892787014068,
        longitude: 76.67488326323438,
        routeCoordinates: [
            { latitude: 30.73893, longitude: 76.67497 },
            { latitude: 30.73643, longitude: 76.67489 },
            { latitude: 30.73463, longitude: 76.67508 },
            { latitude: 30.73302, longitude: 76.67543 },
            { latitude: 30.73216, longitude: 76.6758 },
            { latitude: 30.73167, longitude: 76.6761 },
            { latitude: 30.73099, longitude: 76.67676 },
            { latitude: 30.73075, longitude: 76.67677 },
            { latitude: 30.72723, longitude: 76.68028 },
            { latitude: 30.72572, longitude: 76.68173 },
            { latitude: 30.72562, longitude: 76.68183 },
            { latitude: 30.72564, longitude: 76.68192 },
            { latitude: 30.72564, longitude: 76.68207 },
            { latitude: 30.72561, longitude: 76.68266 },
            { latitude: 30.72557, longitude: 76.68273 },
            { latitude: 30.72591, longitude: 76.68315 },
            { latitude: 30.72599, longitude: 76.68325 }
        ]
    },
    {
        latitude: 30.73892787014068,
        longitude: 76.67488326323438,
        routeCoordinates: [
            { latitude: 30.73893, longitude: 76.67497 },
            { latitude: 30.73643, longitude: 76.67489 },
            { latitude: 30.73463, longitude: 76.67508 },
            { latitude: 30.73302, longitude: 76.67543 },
            { latitude: 30.73216, longitude: 76.6758 },
            { latitude: 30.73167, longitude: 76.6761 },
            { latitude: 30.73099, longitude: 76.67676 },
            { latitude: 30.73075, longitude: 76.67677 },
            { latitude: 30.72723, longitude: 76.68028 },
            { latitude: 30.72572, longitude: 76.68173 },
            { latitude: 30.72562, longitude: 76.68183 },
            { latitude: 30.72564, longitude: 76.68192 },
            { latitude: 30.72564, longitude: 76.68207 },
            { latitude: 30.72561, longitude: 76.68266 },
            { latitude: 30.72557, longitude: 76.68273 },
            { latitude: 30.72591, longitude: 76.68315 },
            { latitude: 30.72599, longitude: 76.68325 }
        ]
    },
    {
        latitude: 30.73892787014068,
        longitude: 76.67488326323438,
        routeCoordinates: [
            { "latitude": 30.73893, "longitude": 76.67497 },
            { "latitude": 30.73643, "longitude": 76.67489 },
            { "latitude": 30.73463, "longitude": 76.67508 },
            { "latitude": 30.73302, "longitude": 76.67543 },
            { "latitude": 30.73216, "longitude": 76.6758 },
            { "latitude": 30.73167, "longitude": 76.6761 },
            { "latitude": 30.73099, "longitude": 76.67676 },
            { "latitude": 30.73075, "longitude": 76.67677 },
            { "latitude": 30.72723, "longitude": 76.68028 },
            { "latitude": 30.72572, "longitude": 76.68173 },
            { "latitude": 30.72562, "longitude": 76.68183 },
            { "latitude": 30.72564, "longitude": 76.68192 },
            { "latitude": 30.72564, "longitude": 76.68207 },
            { "latitude": 30.72561, "longitude": 76.68266 },
            { "latitude": 30.72557, "longitude": 76.68273 },
            { "latitude": 30.72591, "longitude": 76.68315 },
            { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.735287044023345,
        longitude: 76.67489347541884,
        routeCoordinates: [{ "latitude": 30.73528, "longitude": 76.67481 }, { "latitude": 30.73466, "longitude": 76.6749 }, { "latitude": 30.73372, "longitude": 76.6751 }, { "latitude": 30.73288, "longitude": 76.67534 }, { "latitude": 30.73238, "longitude": 76.67551 }, { "latitude": 30.73203, "longitude": 76.67568 }, { "latitude": 30.73173, "longitude": 76.67588 }, { "latitude": 30.73118, "longitude": 76.67634 }, { "latitude": 30.73075, "longitude": 76.67677 }, { "latitude": 30.72723, "longitude": 76.68028 }, { "latitude": 30.72649, "longitude": 76.68098 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68194 }, { "latitude": 30.72563, "longitude": 76.68224 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.73301440649296,
        longitude: 76.67542283456136,
        routeCoordinates: [{ "latitude": 30.73302, "longitude": 76.67543 }, { "latitude": 30.73216, "longitude": 76.6758 }, { "latitude": 30.73167, "longitude": 76.6761 }, { "latitude": 30.73099, "longitude": 76.67676 }, { "latitude": 30.73075, "longitude": 76.67677 }, { "latitude": 30.72723, "longitude": 76.68028 }, { "latitude": 30.72572, "longitude": 76.68173 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68192 }, { "latitude": 30.72564, "longitude": 76.68207 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72591, "longitude": 76.68315 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.73158369647519,
        longitude: 76.67619709142694,
        routeCoordinates: [{ "latitude": 30.73158, "longitude": 76.67619 }, { "latitude": 30.73099, "longitude": 76.67676 }, { "latitude": 30.73075, "longitude": 76.67677 }, { "latitude": 30.72723, "longitude": 76.68028 }, { "latitude": 30.72649, "longitude": 76.68098 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68194 }, { "latitude": 30.72563, "longitude": 76.68224 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.73062246989665,
        longitude: 76.67697204012471,

        routeCoordinates: [{ "latitude": 30.73059, "longitude": 76.67693 }, { "latitude": 30.72723, "longitude": 76.68028 }, { "latitude": 30.72649, "longitude": 76.68098 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68194 }, { "latitude": 30.72563, "longitude": 76.68224 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72599, "longitude": 76.68325 }]

    },
    {
        latitude: 30.729960609927645,
        longitude: 76.67754026243743,
        routeCoordinates: [{ "latitude": 30.72997, "longitude": 76.67755 }, { "latitude": 30.72723, "longitude": 76.68028 }, { "latitude": 30.72649, "longitude": 76.68098 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68194 }, { "latitude": 30.72563, "longitude": 76.68224 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.72939440649933,
        longitude: 76.67821847365518,
        routeCoordinates: [{ "latitude": 30.72935, "longitude": 76.67816 }, { "latitude": 30.72723, "longitude": 76.68028 }, { "latitude": 30.72649, "longitude": 76.68098 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68194 }, { "latitude": 30.72563, "longitude": 76.68224 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.728930070013156,
        longitude: 76.67868957852293,
        routeCoordinates: [{ "latitude": 30.72888, "longitude": 76.67863 }, { "latitude": 30.72723, "longitude": 76.68028 }, { "latitude": 30.72649, "longitude": 76.68098 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68194 }, { "latitude": 30.72563, "longitude": 76.68224 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.728421057113692,
        longitude: 76.67905424771334,
        routeCoordinates: [{ "latitude": 30.72844, "longitude": 76.67908 }, { "latitude": 30.72723, "longitude": 76.68028 }, { "latitude": 30.72649, "longitude": 76.68098 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68194 }, { "latitude": 30.72563, "longitude": 76.68224 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.72718722448623,
        longitude: 76.68041270069178,
        routeCoordinates: [{ "latitude": 30.72715, "longitude": 76.68036 }, { "latitude": 30.72572, "longitude": 76.68173 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68192 }, { "latitude": 30.72564, "longitude": 76.68207 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72591, "longitude": 76.68315 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.726958822662546,
        longitude: 76.68055466085843,
        routeCoordinates: [{ "latitude": 30.72695, "longitude": 76.68054 }, { "latitude": 30.72572, "longitude": 76.68173 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68192 }, { "latitude": 30.72564, "longitude": 76.68207 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72591, "longitude": 76.68315 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.726020011608103,
        longitude: 76.68158548878253,
        routeCoordinates: [{ "latitude": 30.72604, "longitude": 76.68162 }, { "latitude": 30.72583, "longitude": 76.68179 }, { "latitude": 30.72576, "longitude": 76.68178 }, { "latitude": 30.72572, "longitude": 76.68173 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68194 }, { "latitude": 30.72563, "longitude": 76.68224 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.726243176078768,
        longitude: 76.68213766170996,
        routeCoordinates: [{ "latitude": 30.72625, "longitude": 76.68214 }, { "latitude": 30.72601, "longitude": 76.68165 }, { "latitude": 30.72586, "longitude": 76.68178 }, { "latitude": 30.72582, "longitude": 76.6818 }, { "latitude": 30.72578, "longitude": 76.68179 }, { "latitude": 30.72572, "longitude": 76.68173 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68192 }, { "latitude": 30.72564, "longitude": 76.68207 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72591, "longitude": 76.68315 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    },
    {
        latitude: 30.72604648659675,
        longitude: 76.68227775856775,
        routeCoordinates: [{ "latitude": 30.72626, "longitude": 76.68216 }, { "latitude": 30.72601, "longitude": 76.68165 }, { "latitude": 30.72586, "longitude": 76.68178 }, { "latitude": 30.72582, "longitude": 76.6818 }, { "latitude": 30.72578, "longitude": 76.68179 }, { "latitude": 30.72572, "longitude": 76.68173 }, { "latitude": 30.72562, "longitude": 76.68183 }, { "latitude": 30.72564, "longitude": 76.68192 }, { "latitude": 30.72564, "longitude": 76.68207 }, { "latitude": 30.72561, "longitude": 76.68266 }, { "latitude": 30.72557, "longitude": 76.68273 }, { "latitude": 30.72591, "longitude": 76.68315 }, { "latitude": 30.72599, "longitude": 76.68325 }]
    }
]


const Tracking = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [cancelModal, setCancelModal] = useState<boolean>(false)
    const [deliveredModal, setDeliveredModal] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0)
    const [location, setLocation] = useState<any>()
    const { assignedOrder, user } = useSelector((state: AppState) => ({
        assignedOrder: state.user.user.assignedOrders,
        user: state.user.user
    }), shallowEqual)
    const dispatch = useDispatch()
    const logoutHandler = useCallback(() => {
        dispatch(actions.setUserData(null))
        dispatch(actions.setLogin(false))
    }, [])

    const handleCancelOrder = useCallback(() => {
        dispatch(actions.updateOrderStatus({ status: 'placed', driverId: 0, id: assignedOrder.Id }))
        dispatch(actions.assignOrder({ id: user.Id, order: null }))
        setCancelModal(false)
    }, [])


    const handleOrderDelivered = useCallback(() => {
        dispatch(actions.updateOrderStatus({ status: 'delivered', driverId: 0, id: assignedOrder.Id }))
        dispatch(actions.assignOrder({ id: user.Id, order: null }))
        setDeliveredModal(false)
    }, [])



    const requestLocationPermission = async () => {
        let device: string = Platform.OS
        if (device === 'ios') {
            check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                    case RESULTS.LIMITED:
                    case RESULTS.GRANTED:
                        request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((res) => {
                            if (res === 'granted') {
                                Geolocation.getCurrentPosition(
                                    position => {
                                        const { latitude, longitude } = position.coords;
                                        setLocation({
                                            latitude,
                                            longitude,
                                        });
                                    },
                                    error => {
                                        console.log(error.code, error.message);
                                    },
                                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                                );
                            } else {
                                console.log('You cannot use Geolocation');
                            }
                        })
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
                .catch((error) => {
                    // …
                });
        } else if (device === 'android') {
            check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                    case RESULTS.LIMITED:
                    case RESULTS.GRANTED:
                        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((res) => {
                            if (res === 'granted') {
                                Geolocation.getCurrentPosition(
                                    position => {
                                        const { latitude, longitude } = position.coords;
                                        setLocation({
                                            latitude,
                                            longitude,
                                        });
                                    },
                                    error => {
                                        console.log(error.code, error.message);
                                    },
                                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                                );
                            } else {
                                console.log('You cannot use Geolocation');
                            }
                        })
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
        }
    };


    useEffect(() => {
        requestLocationPermission()
        // const interval = setInterval(() => setCount(_ => _ + 1), 5000)
        // return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const index = count % 16;
        let coordinate = {
            latitude: coordinates[index].latitude,
            longitude: coordinates[index].longitude,
            route: JSON.stringify(coordinates[index].routeCoordinates)

        }
        dispatch(actions.updateDriverLocation({ coordinates: coordinate, id: user?.Id }))
    }, [count])

    console.log(location);


    return (
        <>
            <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
                <CustomHeader title='Tracking' showLeftIcon={false} />
                <View style={[styles.cartContainer, { position: 'absolute', top: Platform.OS === 'android' ? scaler(10) : scaler(40), right: scaler(30) }]}>
                    <Icon name='logout' size={27} color={colors.colorWhite} style={[{}]} onPress={() => setModalOpen(true)} />
                </View>
                {assignedOrder?.Id ? (<>
                    <View style={styles.container}>
                        <Text style={styles.methodText}>Order Delivery Info:</Text>
                        <Card
                            style={styles.deliveredContainer}
                            onPressCard={() => { }}
                            touchableOpacity={1}
                        >
                            <Text style={styles.text}>Pickup from:  {assignedOrder?.orderFrom}</Text>
                            <Text style={styles.text}>Deliver To:  {assignedOrder?.deliverTo?.address}</Text>
                            <Text style={styles.text}>Contact no.:  {assignedOrder?.contact}</Text>
                            <Text style={styles.text}>No. of item(s): {assignedOrder?.products?.length}</Text>

                            <Button title="Cancel delivery" type='secondary' buttonStyle={{ paddingVertical: scaler(10), margin: scaler(10), marginTop: scaler(25) }} onPressButton={() => setCancelModal(true)} />

                            <Button title="Delivered" buttonStyle={{ paddingVertical: scaler(10), margin: scaler(10) }} onPressButton={() => setDeliveredModal(true)} />
                        </Card>
                    </View>
                    <Button title={'View on map'} buttonStyle={{ margin: scaler(15) }} />
                </>) : null}
            </SafeAreaView>

            <Popup
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={'Logout'}
                leftButtonText={'Cancel'}
                rightButtonText="Logout"
                leftButtonAction={() => setModalOpen(false)}
                rightButtonAction={logoutHandler}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Are you want to Logout from the Food App?</Text>
                </View>
            </Popup>


            <Popup
                isOpen={cancelModal}
                onClose={() => setCancelModal(false)}
                title={'Cancel Delivery'}
                leftButtonText={'No'}
                rightButtonText="Cancel"
                leftButtonAction={() => setCancelModal(false)}
                rightButtonAction={handleCancelOrder}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Are you want to cancel this order?</Text>
                </View>
            </Popup>

            <Popup
                isOpen={deliveredModal}
                onClose={() => setDeliveredModal(false)}
                title={'Complete Delivery'}
                leftButtonText={'No'}
                rightButtonText="Yes"
                leftButtonAction={() => setDeliveredModal(false)}
                rightButtonAction={handleOrderDelivered}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Is this delivery completed?</Text>
                </View>
            </Popup>
        </>
    )
}

export default Tracking


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
    cartContainer: {
        backgroundColor: colors.colorPrimary,
        padding: 10,
        borderRadius: 50
    },
    modalContainer: {
        padding: scaler(15),
        display: 'flex',
        flexShrink: 1
    },
    modalText: {
        fontWeight: '600',
        color: colors.colorGreyInactive
    },
    deliveredContainer: {
        backgroundColor: colors.colorWhite,
        padding: scaler(15),
    },
    text: {
        fontSize: scaler(12),
        fontWeight: '600',
    },
})