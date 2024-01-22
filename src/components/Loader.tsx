import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from 'src/assets/Colors';

const Loader = () => {
    const isLoading = useSelector((_: any) => _?.extra?.loading)
    if (isLoading)
        return (
            <View
                style={styles.container}>
                <ActivityIndicator color={colors.colorPrimary} size={'large'} />
            </View>
        )
    return null
}

export default Loader

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.colorD,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
    },
    container1: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        backgroundColor: colors.colorGreyMore,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
    }
})