import { colors } from 'assets/Colors';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CustomHeader from 'src/components/CustomHeader';
import { actions } from 'src/redux/slices/reducer';
import { AppState } from 'src/types/interface';

const TrackingMap = ({ route, navigation }: any) => {

    const orderDetail = route?.params?.order
    const dispatch = useDispatch()
    const { driver } = useSelector((state: AppState) => ({
        driver: state.delivery.driverInfo
    }), shallowEqual)

    useEffect(() => {
        if (orderDetail?.driverId && orderDetail?.driverId != 0)
            dispatch(actions.getDriverInfo(orderDetail.driverId))
    }, [orderDetail])

    const driverLocation = driver?.driverLocation || {}

    console.log(driverLocation, 'id');
    return (
        <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.colorBackground }}>
            <CustomHeader title='Track Order' />
            <View>
                <Text>TrackingMap</Text>

                {/* <MapView
                style={{ backgroundColor: 'green' }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={{
                    latitude: 30.7261478,
                    longitude: 76.6830774
                }} />
            </MapView> */}
            </View>
        </SafeAreaView>
    )
}

export default TrackingMap