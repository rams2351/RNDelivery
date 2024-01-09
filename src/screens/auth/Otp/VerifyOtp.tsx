import OTPInputView from '@twotalltotems/react-native-otp-input'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Image, Platform, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from 'src/assets/Colors'
import { Images } from 'src/assets/image'
import Button from 'src/components/Button'
import { actions } from 'src/redux/slices/reducer'
import { AuthScreens } from 'utils/Constants'
import { scaler } from 'utils/Scaler'

interface IOtpState {
    value: string | any;
    disable: boolean;
}

const VerifyOtp = ({ route, navigation }: any) => {
    const [otp, setOtp] = useState<IOtpState>({
        value: "",
        disable: true
    })
    const [loading, setLoading] = useState<boolean>(false)
    const phone = route?.params?.phone?.slice(3)
    const dispatch = useDispatch()
    const state = useSelector((state: any) => state.auth)
    console.log(state)

    const getOtpHandler = useCallback((otp: string) => {
        console.log(otp);
        if (otp === '1234') {
            dispatch(actions.setLogin(true))
            navigation.push(AuthScreens.SIGN_UP)
        } else {

        }
    }, [])
    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
            <View
                style={styles.container}>
                <Image source={Images.logo} />
                <Text style={styles.otpText}>Verify OTP</Text>
                <View style={styles.underline} />
            </View>
            <KeyboardAwareScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flex: 1 }}
                enableOnAndroid={true}
                // extraScrollHeight={Platform.OS === 'ios' ? 0 : 40}
                enableAutomaticScroll={(Platform.OS === 'ios')}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.enterMobileText}>Verify with OTP sent to {phone}</Text>

                    <OTPInputView
                        style={{ width: '90%', height: scaler(100) }}
                        pinCount={4}
                        code={otp.value}

                        editable
                        onCodeChanged={code => setOtp((d) => ({ disable: code.length == 4 ? false : true, value: code }))}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    />


                    <Text style={styles.termsText}>Didn't receive it? Retry in 00:24</Text>

                    <Button
                        title={loading ? <ActivityIndicator color={colors.colorPrimary} /> : 'Continue'}
                        buttonStyle={{}}
                        textStyle={{ fontWeight: '700' }}
                        disabled={otp.disable}
                        onPressButton={() => getOtpHandler(otp.value)}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default VerifyOtp

const styles = StyleSheet.create({
    container: {
        flex: 1 / 2,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: colors.colorWhite,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpText: {
        fontSize: scaler(20),
        fontWeight: '600',
        color: colors.colorBlackText,
        marginRight: scaler(10)
    },
    underline: {
        borderTopWidth: 2,
        width: scaler(100),
        marginRight: scaler(10),
        marginTop: scaler(2),
        borderTopColor: colors.colorPrimary
    },
    inputContainer: {
        flex: 1,
        backgroundColor: colors.colorBackground,
        marginTop: scaler(20),
        paddingHorizontal: scaler(15),
        display: 'flex'
    },
    enterMobileText: {
        fontSize: scaler(20),
        fontWeight: '700',
        color: colors.colorBlackText
    },
    termsText: {
        fontSize: scaler(10),
        fontWeight: '600',
        color: colors.colorBlackText,
        marginTop: 'auto',
        marginBottom: scaler(10),
        textAlign: 'center'
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: colors.colorPrimary,
    },

    underlineStyleBase: {
        width: scaler(40),
        height: scaler(40),
        borderWidth: 1,
        // paddingHorizontal: 20,
        borderRadius: scaler(8),
        color: colors.colorBlackText,
        backgroundColor: colors.colorWhite
        // borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: colors.colorPrimary,
    },
})