import { colors } from 'assets/Colors';
import { Images } from 'assets/image';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CustomHeader from 'src/components/CustomHeader';
import { actions } from 'src/redux/slices/reducer';
import { AppState } from 'src/types/interface';
import { _showErrorMessage } from 'utils/Helpers';
import { NavigationService } from 'utils/NavigationService';
import { scaler } from 'utils/Scaler';


const deliveryDining = MaterialIcon.getImageSourceSync('delivery-dining', 50, colors.colorPrimary)
const homeIcon = Icon.getImageSourceSync('home', 40, colors.colorFocus)
const vehicleImage = Images.ic_delivery_vehicle

const TrackingMap = ({ route, navigation }: any) => {

    const orderDetail = route?.params?.order
    const dispatch = useDispatch()
    const [coords, setCoords] = useState<any>()
    const { driver } = useSelector((state: AppState) => ({
        driver: state.delivery.driverInfo
    }), shallowEqual)

    useEffect(() => {
        if (orderDetail?.driverId && orderDetail?.driverId != 0)
            dispatch(actions.getDriverInfo(orderDetail.driverId))
        else {
            NavigationService.goBack()
            _showErrorMessage('Some thing went wrong, please try after sometime!')
        }
    }, [orderDetail])

    let line = []
    if (driver?.Id) {
        line = driver.driverLocation.route
    }


    const driverLocation = {
        latitude: driver?.driverLocation.latitude || 30.8074,
        longitude: driver?.driverLocation.longitude || 76.683011,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }
    const deliverLocation = {
        latitude: orderDetail?.deliverTo?.location.latitude || 30.8074,
        longitude: orderDetail?.deliverTo?.location.longitude || 76.683011,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }
    useEffect(() => {
        const interval = setInterval(() => dispatch(actions.getDriverInfo(orderDetail.driverId)), 5000)
        if (driver?.Id) {
            setCoords(driver.driverLocation.route)
        }
        return () => clearInterval(interval)

    }, [driver])
    // useEffect(() => {
    //     //fetch the coordinates and then store its value into the coords Hook.
    //     getDirections(`${driverLocation.latitude},${driverLocation.longitude}`, `${deliverLocation.latitude},${deliverLocation.longitude}`)
    //         .then(coords => setCoords(coords))
    //         .catch(err => console.log("Something went wrong"));
    // }, [driverLocation, deliverLocation]);



    return (
        <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.colorBackground }}>
            <CustomHeader title='Track Order' />
            <View style={{ flex: 1 }}>
                {orderDetail.Id ? <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    loadingEnabled
                    initialRegion={{
                        latitude: 30.7260915,
                        longitude: 76.683011,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <Marker
                        image={deliveryDining}
                        coordinate={{
                            latitude: driverLocation.latitude,
                            longitude: driverLocation.longitude
                        }}
                    >
                        {/* <Image source={Images.ic_delivery_vehicle} style={{ height: 50, width: 50, objectFit: 'contain' }} /> */}
                    </Marker>
                    {coords?.length ? <Polyline
                        strokeWidth={5}
                        strokeColor={colors.colorSuccess}
                        coordinates={JSON.parse(coords)} //specify our coordinates
                    /> : null}
                    {/* <Polyline
                        coordinates={[driverLocation, deliverLocation]} //specify our coordinates
                        strokeColor={colors.colorSuccess}
                        strokeWidth={3}
                        lineDashPattern={[1]}
                    /> */}
                    <Marker
                        icon={homeIcon}
                        coordinate={{
                            latitude: deliverLocation.latitude,
                            longitude: deliverLocation.longitude
                        }}
                    >


                    </Marker>
                </MapView> : <></>}
            </View>
        </SafeAreaView>
    )
}

export default TrackingMap

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.colorPrimary,
        padding: scaler(5),
        borderRadius: 50

    },
    map: {

        flex: 1
    },
});