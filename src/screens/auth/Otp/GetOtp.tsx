import React, { useCallback, useEffect, useState } from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, Images } from 'src/assets'
import Button from 'src/components/Button'
import RNPhoneInput from 'src/components/PhoneInput'
import { AuthScreens } from 'utils/Constants'
import { scaler } from 'utils/Scaler'

interface IMobileState { value: string; disable: boolean; }


const GetOtpScreen = ({ navigation }: any) => {
    const [mobile, setMobile] = useState<IMobileState>({
        value: "9001547464",
        disable: true
    })

    const phoneHandler = useCallback((text: string) => {
        setMobile((_) => ({ value: text, disable: text.length <= 12 ?? false }))
    }, [])

    const getOtpHandler = useCallback((phone: string) => {
        navigation.push(AuthScreens.VERIFY_OTP, { phone })
    }, [])
    useEffect(() => {
        setMobile((_) => {
            let val = '9001547464'
            return { value: val, disable: val.length <= 12 ?? false }
        })
    }, [])
    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
            <View
                style={styles.container}>
                <Image source={Images.logo} />
                <Text style={styles.otpText}>OTP</Text>
                <View style={styles.underline} />
            </View>
            <KeyboardAwareScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                // extraScrollHeight={Platform.OS === 'ios' ? 0 : 40}
                enableAutomaticScroll={(Platform.OS === 'ios')}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.enterMobileText}>Enter your mobile number to get OTP</Text>
                    <RNPhoneInput onChangeValue={phoneHandler} defaultValue={mobile.value} />
                </View>
            </KeyboardAwareScrollView>
            <View style={{ paddingHorizontal: scaler(15) }}>
                <Text style={styles.termsText}>By clicking, I accept the terms of service and privacy policy.</Text>
                <Button
                    title='Get OTP'
                    buttonStyle={{ marginBottom: scaler(25) }}
                    textStyle={{ fontWeight: '600' }}
                    disabled={mobile.disable}
                    onPressButton={() => getOtpHandler(mobile.value)}
                />
            </View>

        </SafeAreaView >
    )
}

export default GetOtpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: scaler(40),
        marginRight: scaler(10),
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
        marginBottom: scaler(10),
        textAlign: 'center'
    }
})