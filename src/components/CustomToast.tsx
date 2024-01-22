import { colors } from 'assets/alllll'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast'
import { scaler } from 'utils/all'
import Text from './Text'

const CustomToast = (props: ToastProps) => {
    return (
        <View style={[styles.container, props.type === 'success' ? styles.success : props.type === 'danger' ? styles.error : {}]}>
            <Text >{props.message}</Text>
        </View>
    )
}

export default CustomToast

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.colorWhite,
        width: '80%',
        paddingVertical: scaler(20),
        borderRadius: scaler(10),
        shadowColor: colors.colorBlack,
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        borderLeftWidth: 5,
        paddingHorizontal: scaler(10),
        borderLeftColor: colors.colorLink
    },
    success: {
        borderLeftColor: colors.colorSuccess,
    },
    error: {
        borderLeftColor: colors.colorRed,
    }
})