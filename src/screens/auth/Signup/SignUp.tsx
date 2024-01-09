import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from 'src/assets/Colors'

const SignUp = () => {
    return (
        <SafeAreaView edges={['top']} style={{ backgroundColor: colors.colorWhite, flex: 1 }}>
            <View style={styles.heading}>
                <Text>signup</Text>
            </View>
            <KeyboardAwareScrollView>
                <View style={{ backgroundColor: colors.colorBackground }}></View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    heading: {
        backgroundColor: colors.colorWhite,
        display: 'flex',
        alignItems: 'center',
    }
})