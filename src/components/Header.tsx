import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { colors } from 'assets/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scaler } from 'utils/Scaler'
import Text from './Text'

const Header = (props: BottomTabHeaderProps) => {


    return (
        <>
            <SafeAreaView style={{ backgroundColor: colors.colorBackground }} edges={['top']} />
            <View style={styles.container}>
                <Text style={styles.text}>{props?.options?.title}</Text>
            </View>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scaler(15),
        backgroundColor: colors.colorBackground
    },
    text: {
        fontSize: scaler(15),
        color: colors.colorPrimary,
        fontWeight: '800'

    }
})