import { yupResolver } from '@hookform/resolvers/yup'
import { colors, Images } from 'assets/alllll'
import React, { useCallback, useEffect, useState } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Button'
import DatePicker from 'src/components/DatePicker'
import RnInput from 'src/components/RnInput'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { requestLocationPermission } from 'utils/GeoLocation'
import { scaler } from 'utils/Scaler'
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
        const payload = {
            ...data,
            phone,
            countryCode: code,
            location
        }
        dispatch(actions.signUpUser(payload))
    }, [location])

    useEffect(() => {
        async function fetchLocation() {
            const hasPermission = await requestLocationPermission()
            if (hasPermission) {
                Geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude })
                    },
                    error => Alert.alert('Error', JSON.stringify(error)),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            }
        }
        fetchLocation()
    }, [])


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