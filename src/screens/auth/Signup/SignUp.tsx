import { yupResolver } from '@hookform/resolvers/yup'
import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback, useEffect, useState } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Button'
import DatePicker from 'src/components/DatePicker'
import RnInput from 'src/components/RnInput'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { _showErrorMessage } from 'utils/Helpers'
import { useLocationService } from 'utils/LocationService'
import { scaler } from 'utils/Scaler'
import * as yup from 'yup'
//@ts-ignore

const formSchema = yup.object().shape({
    firstName: yup.string().required('First name is required!'),
    lastName: yup.string().required('Last name is required!'),
    email: yup.string().required('Email is required!'),
    dob: yup.string().required('Date of birth is required!'),
    lane: yup.string().required('Lane is required!'),
    road: yup.string().required("Road is required"),
    zip: yup.string().required('Zip is required!'),

})

let count = 0

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
        const { lane, road, zip, ...rest } = data
        let addPay = {
            address: rest.firstName + ", " + lane + ", " + road + ", " + zip + ", " + phone,
            location: location,
            phone: phone
        }
        const payload = {
            ...rest,
            phone,
            countryCode: code,
            address: JSON.stringify([addPay]),
            currentAddress: JSON.stringify(addPay)
        }
        dispatch(actions.signUpUser(payload))
    }, [location])



    useEffect(() => {
        useLocationService().then((res) => setLocation(res))
    }, []);

    console.log(location, count++);


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
                                            required
                                            placeholder="First Name"
                                            icon={Images.user}
                                        />

                                        <RnInput
                                            title='Last Name'
                                            name="lastName"
                                            required
                                            placeholder="Last Name"
                                            icon={Images.user}
                                        />

                                        <RnInput
                                            title='Email address'
                                            name="email"
                                            required
                                            placeholder="Email"
                                            icon={Images.email}
                                            type={'email-address'}
                                        />

                                        <DatePicker
                                            title='Date of birth'
                                            required
                                            onChangeValue={e => console.log((e))}
                                        />

                                        <RnInput
                                            title='Lane'
                                            name="lane"
                                            required
                                            placeholder="Lane"
                                            icon={Images.user}
                                        />
                                        <RnInput
                                            title='Road'
                                            name="road"
                                            required
                                            placeholder="Road"
                                            icon={Images.user}
                                        />
                                        <RnInput
                                            title='Postal code'
                                            name="zip"
                                            required
                                            type='numeric'
                                            placeholder="Postal code"
                                            icon={Images.user}
                                        />
                                    </View>

                                    <Button title="Continue" onPressButton={submit as any} buttonStyle={styles.buttonContainer} />

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