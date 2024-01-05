import React from 'react'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from 'src/assets/Colors'

const Loader = () => {
    return (
        <SafeAreaView
            edges={['bottom', 'top']}
            style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                backgroundColor: colors.colorD,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }}>
            <ActivityIndicator color={colors.colorPrimary} size={'large'} />
        </SafeAreaView>
    )
}

export default Loader