import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export async function requestLocationPermission() {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'Your app needs access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
                return true;
            } else {
                console.log('Location permission denied');
                return false;
            }
        } else if (Platform.OS === 'ios') {
            const status = await Geolocation.requestAuthorization('whenInUse');
            if (status === 'granted') {
                console.log('Location permission granted');
                return true;
            } else {
                console.log('Location permission denied');
                return false;
            }
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}



export const getLocation = async () => {
    Geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            return ({ latitude, longitude })
        },
        error => Alert.alert('Error', JSON.stringify(error)),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
}