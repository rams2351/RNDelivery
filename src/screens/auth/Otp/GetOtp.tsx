import { colors } from 'assets/Colors'
import React, { useCallback, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Button'
import RNPhoneInput from 'src/components/PhoneInput'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { scaler } from 'utils/Scaler'

interface IMobileState { value: string; disable: boolean; }


const GetOtpScreen = ({ navigation }: any) => {
    const [mobile, setMobile] = useState<IMobileState>(() => {
        let val = '9001547464'
        return {
            value: val,
            disable: val.length < 10 ?? false
        }
    })

    const dispatch = useDispatch()

    const phoneHandler = useCallback((text: string) => {
        setMobile((_) => ({ value: text, disable: text.length <= 12 ?? false }))
    }, [])

    const getOtpHandler = useCallback((phone: string) => {
        let ph = phone
        if (phone.length === 10) {
            ph = '+91' + phone
        }
        dispatch(actions.validateUser(ph))
    }, [])


    return (
        <SafeAreaView edges={['bottom', 'top']} style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.enterMobileText}>Enter your mobile number to get OTP</Text>
                    <RNPhoneInput onChangeValue={phoneHandler} defaultValue={mobile.value} />
                </View>
            </KeyboardAwareScrollView>

            <View style={styles.btnContainer}>
                <Text style={styles.termsText}>By clicking, I accept the terms of service and privacy policy.</Text>
                <Button
                    title='Get OTP'
                    buttonStyle={{ marginBottom: Platform.OS == 'android' ? scaler(25) : scaler(5) }}
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
    inputContainer: {
        flex: 1,
        backgroundColor: colors.colorBackground,
        marginTop: scaler(20),
        paddingHorizontal: scaler(15),
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
    },
    btnContainer: {
        paddingHorizontal: scaler(15)
    }
})