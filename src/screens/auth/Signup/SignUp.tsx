import { yupResolver } from '@hookform/resolvers/yup'
import { colors, Images } from 'assets'
import React, { useCallback } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Button'
import DatePicker from 'src/components/DatePicker'
import RnInput from 'src/components/RnInput'
import { actions } from 'src/redux/slices/reducer'
import { scaler } from 'utils/Scaler'
import * as yup from 'yup'
//@ts-ignore

const formSchema = yup.object().shape({
    firstName: yup.string().required('First name is required!'),
    lastName: yup.string().required('Last name is required!'),
    email: yup.string().required('Email is required!'),
    dob: yup.string().required('Date of birth is required!')
})

const SignUp = () => {
    const dispatch = useDispatch()

    const methods = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(formSchema)
    })
    const { getValues, handleSubmit } = methods
    // console.log(getValues());

    const handleSubmits = useCallback((data: any) => {
        console.log(data, 'in fn');
        dispatch(actions.setLogin(true))
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
                        <Image source={Images.logo} />
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
                                    </View>

                                    <View style={styles.buttonContainer}>

                                        {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: scaler(13) }}>
                            <Text style={styles.alreadyAccount}>Already have an account? </Text>
                            <TouchableOpacity><Text style={[styles.alreadyAccount, { fontSize: scaler(16), marginBottom: scaler(0), color: colors.colorPrimary, marginLeft: scaler(2) }]}>Login</Text></TouchableOpacity>
                        </View> */}

                                        <Button title="Sign up" onPressButton={submit} />
                                    </View>
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
        height: '30%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: colors.colorWhite,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingHorizontal: scaler(15)
    },
    alreadyAccount: {
        fontSize: scaler(13),
        fontWeight: '600',
        color: colors.colorBlackText,
        // marginBottom: scaler(10),
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBottom: scaler(25),
        paddingHorizontal: scaler(15)
    }
})