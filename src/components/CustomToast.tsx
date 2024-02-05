import { colors } from 'assets/alllll'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast'
import Icon from 'react-native-vector-icons/Entypo'
import { scaler } from 'utils/all'
import Text from './Text'

const CustomToast = (props: ToastProps) => {
    return (
        <View style={[styles.container, props.type === 'success' ? styles.success : props.type === 'danger' ? styles.error : {}]}>
            <Icon name='info-with-circle' size={22} color={colors.colorWhite} style={{ marginTop: scaler(3) }} />
            <Text style={styles.msg} >{props.message}</Text>
        </View>
    )
}

export default CustomToast

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.colorLink,
        width: '85%',
        paddingVertical: scaler(10),
        borderRadius: scaler(10),
        paddingHorizontal: scaler(25),
        flexDirection: 'row',
        // alignItems: 'center',
    },
    success: {
        backgroundColor: colors.colorSuccess,

    },
    error: {
        backgroundColor: colors.colorRed,
    },
    msg: {
        fontWeight: '500',
        fontSize: scaler(13),
        color: colors.colorWhite,
        marginLeft: scaler(8),
        marginTop: Platform.OS === 'android' ? scaler(2) : 0
    }
})