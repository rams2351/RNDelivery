import { colors } from 'assets';
import React, { ReactElement, useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity } from 'react-native';
import { scaler } from 'utils';

interface CardPropsType {
    children?: React.ReactNode | ReactElement;
    cardStyle?: StyleProp<any>;
    onPressCard?: (e: any) => void;
}

const Card: React.FC<CardPropsType> = (props) => {
    const { children, cardStyle, onPressCard } = props

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                backgroundColor: colors.colorWhite,
                borderRadius: scaler(20),
                padding: scaler(15),
                shadowColor: colors.colorBlack,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                marginVertical: scaler(10),
                ...StyleSheet.flatten(cardStyle)
            }
        })
    }, [cardStyle])

    return (
        <TouchableOpacity style={[styles.container]} disabled={!onPressCard} onPress={onPressCard}>
            {children}
        </TouchableOpacity>
    )
}

export default Card

