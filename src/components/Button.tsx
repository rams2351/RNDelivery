import React, { memo, ReactElement, ReactNode } from 'react';
import { GestureResponderEvent, Image, ImageSourcePropType, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
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
    onPressButton?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined
    disabled?: boolean;
    type?: 'primary' | 'secondary'
}

const Button = (props: ButtonProps) => {
    const { title, startIcon, endIcon, onPressButton, disabled = false, containerStyle, type = 'primary' } = props

    const styles = StyleSheet.create({
        title: {
            fontSize: scaler(15),
            fontWeight: '600',
            color: colors.colorWhite,
            ...StyleSheet.flatten(props.textStyle)
        },
        button: {
            backgroundColor: disabled ? colors.colorFadedPrimary : colors.colorPrimary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: startIcon || endIcon ? 'flex-start' : 'center',
            paddingVertical: scaler(15),
            borderRadius: scaler(25),
            ...StyleSheet.flatten(props.buttonStyle)
        },
        icon: {
            height: scaler(20),
            width: scaler(20),
            objectFit: 'contain',
            marginHorizontal: scaler(30)
        },
        container: {
            ...StyleSheet.flatten(containerStyle)
        },
        secondaryButton: {
            borderWidth: 2,
            borderColor: colors.colorPrimary,
            backgroundColor: 'transparent',
        },
        secondaryText: {
            color: colors.colorPrimary
        }
    })
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, type == 'primary' ? {} : styles.secondaryButton]} onPress={onPressButton} disabled={disabled} activeOpacity={0.7}>
                {startIcon ?
                    <Image source={startIcon} style={styles.icon} />
                    : null
                }
                {<Text style={[styles.title, type == 'secondary' ? styles.secondaryText : {}]}>{title}</Text>}
                {endIcon ?
                    <Image source={endIcon} style={styles.icon} />
                    : null
                }
            </TouchableOpacity>
        </View>
    )
}

export default memo(Button)

