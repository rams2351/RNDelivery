import React, { ReactElement, ReactNode } from 'react';
import { GestureResponderEvent, Image, ImageSourcePropType, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from 'src/assets/Colors';
import { scaler } from '../utils/Scaler';
import Text from './Text';
interface ButtonProps {
    title?: string | ReactElement | ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: TextStyle;
    buttonStyle?: StyleProp<ViewStyle>;
    startIcon?: ImageSourcePropType | undefined;
    endIcon?: ImageSourcePropType | undefined;
    onPressButton?: ((event: GestureResponderEvent) => void) | undefined | any;
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
    const { title, startIcon, endIcon, onPressButton, disabled } = props

    const styles = StyleSheet.create({
        title: {
            fontSize: scaler(15),
            fontWeight: '600',
            color: colors.colorWhite,
            ...StyleSheet.flatten(props.textStyle)
        },
        button: {
            backgroundColor: disabled ? colors.colorFadedPrimary : colors.colorPrimary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: startIcon || endIcon ? 'flex-start' : 'center',
            paddingVertical: scaler(17),
            borderRadius: scaler(25),
            flexDirection: 'row',
            ...StyleSheet.flatten(props.buttonStyle)
        },
        icon: {
            height: scaler(20),
            width: scaler(20),
            objectFit: 'contain',
            marginHorizontal: scaler(30)
        }
    })

    return (
        <TouchableOpacity style={styles.button} onPress={onPressButton} disabled={disabled} activeOpacity={0.7}>
            {startIcon ?
                <Image source={startIcon} style={styles.icon} />
                : null
            }
            {<Text style={styles.title}>{title}</Text>}
            {endIcon ?
                <Image source={endIcon} style={styles.icon} />
                : null
            }
        </TouchableOpacity>
    )
}

export default Button

