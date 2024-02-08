import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const useLocationService = async () => {
    let location = {}
    let device: string = Platform.OS
    if (device === 'ios') {
        return await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(async (result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                case RESULTS.LIMITED:
                case RESULTS.GRANTED:
                    return await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(async (res) => {
                        if (res === 'granted') {
                            return _requestPermission
                        } else {
                            console.log('You cannot use Geolocation');
                        }
                    })
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    break;
            }
        })
            .catch((error) => {
                // …
            });

    } else if (device === 'android') {
        return await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(async (result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                case RESULTS.LIMITED:
                case RESULTS.GRANTED:
                    return await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(async (res) => {
                        if (res === 'granted') {
                            return _requestPermission
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
    return location
};


const _requestPermission = new Promise((resolve, reject) => Geolocation.getCurrentPosition(
    position => {
        const { latitude, longitude } = position.coords;
        resolve({
            latitude,
            longitude,
        })
    },
    error => {
        reject(`${error.code, error.message}`)
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
)
)