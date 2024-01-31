import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'
import Text from './Text'

interface HeaderProps {
    title: string;
    showLeftIcon?: boolean;
}

const CustomHeader: React.FC<HeaderProps> = (props) => {
    const { title, showLeftIcon = true } = props
    return (
        <View style={styles.container}>
            {showLeftIcon ? <TouchableOpacity
                onPress={() => NavigationService.goBack()}
            ><Image source={Images.ic_right_icon} style={styles.backIcon} />
            </TouchableOpacity> : null}
            <View style={{ flex: 1, }}>
                <Text style={[styles.text]}>{title}</Text>
            </View>
            {showLeftIcon ? <View style={styles.backIcon} /> : null}
        </View>
    )
}

export default CustomHeader


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: scaler(15),
        backgroundColor: colors.colorBackground
    },
    text: {
        fontSize: scaler(15),
        color: colors.colorPrimary,
        fontWeight: '700',
        textAlign: 'center',
    },
    backIcon: {
        height: scaler(28),
        width: scaler(28)
    },


})