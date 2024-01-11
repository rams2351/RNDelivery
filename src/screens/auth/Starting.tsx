import React, { useCallback } from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { colors } from 'src/assets/Colors'
import { Images } from 'src/assets/image'
import Button from 'src/components/Button'
import { AuthScreens } from 'utils/Constant'
import { scaler } from 'utils/Scaler'

const GetStartScreen = ({ navigation }: any) => {
    console.log(typeof (navigation))
    const onPressGetStarted = useCallback(() => {
        navigation.push(AuthScreens.GET_OTP)
    }, [])
    return (
        <>
            <StatusBar backgroundColor={'transparent'} translucent />
            <View style={styles.container}>
                <View style={styles.logoAndTextContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={Images.logo} style={styles.logo} />
                    </View>
                    <Text style={{ color: colors.colorWhite, fontSize: scaler(50), fontWeight: '800', lineHeight: 65 }}>Food for Everyone</Text>
                </View>
                <View style={styles.toysLogoContainer}>
                    <Image source={Images.toy2}
                        style={styles.toy1} />
                    <Image source={Images.toy1} style={styles.toy2} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='Get Started'
                        buttonStyle={styles.getStartedButton}
                        textStyle={{ color: colors.colorPrimary }}
                        onPressButton={onPressGetStarted}
                    />
                </View>
            </View>
        </>

    )
}

export default GetStartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colorPrimary
    },
    logo: {
        height: scaler(45),
        width: scaler(45),
        resizeMode: 'contain'
    },
    logoContainer: {
        height: scaler(60),
        width: scaler(60),
        backgroundColor: colors.colorWhite,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginBottom: scaler(19),

    },
    logoAndTextContainer: {
        padding: scaler(40),
        marginTop: scaler(20)
    },
    toy1: {
        height: scaler(300),
        width: scaler(200),
        resizeMode: 'contain',
    },
    toy2: {
        height: scaler(300),
        width: scaler(200),
        resizeMode: 'contain',
        zIndex: -20,
        position: 'absolute',
        right: scaler(0),
        marginTop: scaler(30)
    },
    toysLogoContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        overflow: 'hidden',
        shadowColor: colors.colorWhite,
        shadowOffset: { height: 0, width: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 4
    },
    getStartedButton: {
        backgroundColor: colors.colorWhite,
        marginHorizontal: scaler(20),
    },
    buttonContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        paddingVertical: scaler(25)
    }
})