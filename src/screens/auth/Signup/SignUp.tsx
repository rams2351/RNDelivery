import { yupResolver } from '@hookform/resolvers/yup'
import { colors, Images } from 'assets/alllll'
import React, { useCallback, useEffect, useState } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Button'
import DatePicker from 'src/components/DatePicker'
import RnInput from 'src/components/RnInput'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { scaler } from 'utils/Scaler'
import { _showErrorMessage } from 'utils/Utils'
import * as yup from 'yup'
//@ts-ignore

const formSchema = yup.object().shape({
    firstName: yup.string().required('First name is required!'),
    lastName: yup.string().required('Last name is required!'),
    email: yup.string().required('Email is required!'),
    dob: yup.string().required('Date of birth is required!'),
    address: yup.string().required('Address is required!')
})

const SignUp = (props: any) => {
    const { route, navigation } = props

    const [location, setLocation] = useState<any>(null)
    const dispatch = useDispatch()
    const code = route?.params?.phone?.slice(0, 3)
    const phone = route?.params?.phone?.slice(3)
    const methods = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(formSchema)
    })
    const { handleSubmit } = methods

    const handleSubmits = useCallback((data: any) => {
        if (!location) {
            _showErrorMessage("Please enable location for continue!")
            return
        }
        const { address, ...rest } = data

        const payload = {
            ...rest,
            phone,
            countryCode: code,
            address: [{
                address: address,
                location: location
            }]
        }
        dispatch(actions.signUpUser(payload))
    }, [location])



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
        <SafeAreaView edges={['top']} style={styles.safeAreaContainer} >
            <KeyboardAwareScrollView
                bounces={false}
                contentContainerStyle={styles.keyboardScrollContainer}
            >
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    <View
                        style={styles.logoTextContainer}>
                        {/* <Image source={Images.logo} /> */}
                        <Text style={styles.otpText}>Customer Details</Text>
                        <View style={styles.underline} />
                    </View>

                    <FormProvider {...methods}>
                        <Form noValidate
                            onSubmit={handleSubmit(handleSubmits) as any}
                            render={({ submit }) => {
                                return (<>
                                    <View style={styles.formContainer}>
                                        <RnInput
                                            title='First Name'
                                            name="firstName"
                                            onChangeValue={(e) => console.log(e)}
                                            placeholder="First Name"
                                            icon={Images.user}
                                        />

                                        <RnInput
                                            title='Last Name'
                                            name="lastName"
                                            onChangeValue={(e) => console.log(e)}
                                            placeholder="Last Name"
                                            icon={Images.user}
                                        />

                                        <RnInput
                                            title='Email address'
                                            name="email"
                                            onChangeValue={(e) => console.log(e)}
                                            placeholder="Email"
                                            icon={Images.email}
                                            type={'email-address'}
                                        />

                                        <DatePicker
                                            title='Date of birth'
                                            onChangeValue={e => console.log((e))} />

                                        <RnInput
                                            title='Address'
                                            name="address"
                                            onChangeValue={(e) => console.log(e)}
                                            placeholder="Address"
                                            icon={Images.user}
                                        />
                                    </View>


                                    <Button title="Continue" onPressButton={submit} buttonStyle={styles.buttonContainer} />

                                </>)
                            }}
                        />

                    </FormProvider>

                </ScrollView>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.colorWhite
    },
    scrollViewContainer: {
        flex: 1,
        backgroundColor: colors.colorBackground,
    },
    keyboardScrollContainer: {
        minHeight: '100%'
    },
    logoTextContainer: {
        // height: '30%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: colors.colorWhite,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scaler(15)
    },

    heading: {
        backgroundColor: colors.colorWhite,
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        height: scaler(60),
        width: scaler(60),
        marginLeft: scaler(5)
    },
    otpText: {
        fontSize: scaler(20),
        fontWeight: '600',
        color: colors.colorBlackText,
        marginRight: scaler(10)
    },
    underline: {
        borderTopWidth: 2,
        width: scaler(160),
        marginRight: scaler(10),
        borderTopColor: colors.colorPrimary
    },
    formContainer: {
        marginTop: scaler(30),
        paddingHorizontal: scaler(15),
        flex: 1
    },
    alreadyAccount: {
        fontSize: scaler(13),
        fontWeight: '600',
        color: colors.colorBlackText,
        // marginBottom: scaler(10),
        textAlign: 'center',
    },
    buttonContainer: {
        marginBottom: scaler(25),
        marginHorizontal: scaler(15),

    }
})