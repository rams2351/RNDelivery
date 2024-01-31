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

const Tracking = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [cancelModal, setCancelModal] = useState<boolean>(false)
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

    setTimeout(() => {
        console.log('updating location***');
        // dispatch(actions.updateDriverLocation({ coordinates: location, id: user?.Id }))
    }, 20000)
    console.log(assignedOrder);

    const handleCancelOrder = useCallback(() => {
        dispatch(actions.updateOrderStatus({ status: 'placed', driverId: 0, id: assignedOrder.Id }))
        dispatch(actions.assignOrder({ id: user.Id, order: null }))
        setCancelModal(false)
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
                        console.log('The permission has not been requested / is denied but requestable');
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
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
    }, []);
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
                        >
                            <Text style={styles.text}>Pickup from:  {assignedOrder?.orderFrom}</Text>
                            <Text style={styles.text}>Deliver To:  {assignedOrder?.deliverTo?.address}</Text>
                            <Text style={styles.text}>Contact no.:  {assignedOrder?.phone}</Text>
                            <Text style={styles.text}>No. of item(s): {assignedOrder?.products?.length}</Text>
                            <Text style={styles.text}>Pickup from:  {assignedOrder?.orderFrom}</Text>
                            <Button title="Cancel order" buttonStyle={{ paddingVertical: scaler(10), margin: scaler(10) }} onPressButton={() => setCancelModal(true)} />
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