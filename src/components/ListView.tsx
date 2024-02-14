import { colors } from 'assets/Colors';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { scaler } from 'utils/Scaler';
import Text from './Text';

interface Props {
    heading: string;
    value?: string | number;
    headingStyle?: StyleProp<TextStyle>
    valueStyle?: StyleProp<TextStyle>
}

const ListView = (props: Props) => {
    const { heading, value, headingStyle, valueStyle } = props

    const innerStyle = useMemo(() => {
        return {
            heading: { ...styles.heading, ...StyleSheet.flatten(headingStyle) },
            value: { ...styles.value, ...StyleSheet.flatten(valueStyle) }
        }
    }, [headingStyle, valueStyle])

    return (
        <View style={styles.container}>
            <Text style={innerStyle.heading}>{heading}:</Text>
            <Text style={innerStyle.value}>{value}</Text>
        </View>
    )
}

export default ListView

const styles = StyleSheet.create({
    heading: {
        fontWeight: '600',
        fontSize: scaler(15),
        paddingRight: scaler(5)
    },
    value: {
        fontSize: scaler(13),
        color: colors.colorGreyInactive,
        marginTop: scaler(1),
        flexShrink: 1,
    },
    container: {
        flexDirection: 'row',
        flexShrink: 1,
        overflow: 'hidden',
    },

})