import React from 'react'
import { Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const TrackingMap = () => {
    return (
        <View>
            <Text>TrackingMap</Text>

            <MapView
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
            </MapView>
        </View>
    )
}

export default TrackingMap