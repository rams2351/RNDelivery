import OTPInputView from '@twotalltotems/react-native-otp-input'
import React, { useCallback, useMemo, useState } from 'react'
import { Platform, StyleSheet, Switch, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { colors } from 'src/assets/Colors'
import Button from 'src/components/Button'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { AuthScreens } from 'utils/Constant'
import { _showErrorMessage } from 'utils/Helpers'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'

interface IOtpState {
    value: string | any;
    disable: boolean;
    error: boolean;
}

const VerifyOtp = ({ route, navigation }: any) => {
    const [otp, setOtp] = useState<IOtpState>({
        value: "",
        disable: true,
        error: false
    })
    const phone = route?.params?.phone?.slice(3)
    const dispatch = useDispatch()
    const { userData } = useSelector((state: AppState) => ({
        userData: state.user.user
    }
    ), shallowEqual)

    const [isEnabled, setIsEnabled] = useState<number>(userData.deliveryPartner ? 1 : 0);
    const inputStyle = useMemo(() => {
        return {
            ...styles.underlineStyleBase,
            borderColor: otp.error ? colors.colorRed : colors.colorGreyMore,
            borderWidth: otp.error ? 2 : 1,
            color: otp.error ? colors.colorRed : colors.colorBlackText
        }
    }, [otp])
    const focusInput = useMemo(() => {
        return { borderColor: otp.error ? colors.colorRed : colors.colorFocus, borderWidth: otp.error ? 2 : 1 }
    }, [otp])

    const getOtpHandler = useCallback((otp: string) => {
        if (otp === '1234') {
            if (userData?.Id && isEnabled != userData?.deliveryPartner) {
                dispatch(actions.setLogin(true))
                dispatch(actions.LoggedAsPartner({ id: userData?.Id, value: isEnabled }))
            } else if (userData?.Id) {
                dispatch(actions.setLogin(true))
            }
            else {
                NavigationService.push(AuthScreens.SIGN_UP, { phone: route?.params?.phone })
            }
        } else {
            _showErrorMessage('Please enter valid otp!')
            setOtp(_ => ({ ..._, error: true }))
        }
    }, [userData, isEnabled])

    const toggleSwitch = () => setIsEnabled(previousState => previousState == 1 ? 0 : 1);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
            <KeyboardAwareScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.enterMobileText}>Verify with OTP sent to {phone}</Text>

                    <OTPInputView
                        style={{ width: '90%', height: scaler(100) }}
                        pinCount={4}
                        code={otp.value}
                        editable
                        onCodeChanged={code => setOtp((d) => ({ disable: code.length == 4 ? false : true, value: code, error: false }))}
                        autoFocusOnLoad
                        codeInputFieldStyle={inputStyle}
                        codeInputHighlightStyle={focusInput}

                    />
                    <Text style={styles.termsText}>Didn't receive it? Retry in 00:24</Text>

                </View>
            </KeyboardAwareScrollView>
            <View style={styles.deliveryPartner}>
                <Switch
                    style={{ borderWidth: 1, borderColor: colors.colorFocus }}
                    trackColor={{ false: '#767577', true: colors.colorBackground }}
                    thumbColor={isEnabled ? colors.colorPrimary : '#f4f3f4'}
                    ios_backgroundColor='#f4f3f4'
                    onValueChange={toggleSwitch}
                    value={isEnabled == 1 ? true : false}
                />
                <Text style={styles.partnerText}>Logged in as delivery partner?</Text>
            </View>
            <Button
                title={'Continue'}
                buttonStyle={{ marginBottom: Platform.OS == 'android' ? scaler(20) : scaler(5), marginHorizontal: scaler(20) }}
                textStyle={{ fontWeight: '700' }}
                disabled={otp.disable}
                onPressButton={() => getOtpHandler(otp.value)}
            />
        </SafeAreaView>
    )
}

export default VerifyOtp

const styles = StyleSheet.create({
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
        borderRadius: scaler(8),
        color: colors.colorBlackText,
        backgroundColor: colors.colorWhite
    },

    underlineStyleHighLighted: {
        borderColor: colors.colorFocus,
    },
    deliveryPartner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scaler(25),
        marginBottom: scaler(15)
    },
    partnerText: {
        fontSize: scaler(13),
        fontWeight: '500',
        paddingLeft: scaler(10),
        color: colors.colorBlackText,
    }
})