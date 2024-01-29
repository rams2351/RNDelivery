//@ts-ignore
import CardView from 'react-native-cardview';

import { colors } from 'assets/Colors';
import React, { ReactElement, ReactNode, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scaler } from 'utils/Scaler';

interface CardProps {
    style?: StyleProp<ViewStyle>;
    children: ReactNode | ReactElement;
    onPressCard?: () => void;
    touchableOpacity?: number;
}

const Card: React.FC<CardProps> = (props) => {
    const { style, children, onPressCard, touchableOpacity } = props

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                backgroundColor: colors.colorWhite,
                ...StyleSheet.flatten(style)
            }
        })
    }, [style])
    return (
        <CardView
            cardElevation={3}
            cardMaxElevation={2}
            cornerRadius={15}
            style={styles.container}
        >
            <TouchableOpacity style={{ padding: scaler(10) }} onPress={onPressCard} disabled={!onPressCard} activeOpacity={touchableOpacity ?? 0.5}>
                {children}
            </TouchableOpacity>
        </CardView>
    )
}

export default Card