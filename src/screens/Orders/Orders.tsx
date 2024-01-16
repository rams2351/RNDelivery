import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from 'utils/GeoLocation';

const Orders = () => {
    const [location, setLocation] = useState<any>(null)
    useEffect(() => {
        async function fetchLocation() {
            const hasPermission = await requestLocationPermission();
            if (hasPermission) {
                const hello = Geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude })
                    },
                    error => Alert.alert('Error', JSON.stringify(error)),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            }
        }

        fetchLocation();
    }, [])
    return (
        <View style={{ marginTop: 50 }}>
            <TouchableOpacity>

                <Text>Orders {location?.latitude}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Orders