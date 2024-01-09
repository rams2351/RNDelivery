import React from 'react';
import { StyleSheet } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { colors } from 'src/assets/Colors';
import { scaler } from 'utils/Scaler';

interface PhoneInputProps {
    phone?: string;
    onChangeValue?: (e: string) => void;
    defaultValue?: string;
}

const RNPhoneInput = (props: PhoneInputProps) => {
    const { onChangeValue, defaultValue } = props;
    return (
        <PhoneInput
            containerStyle={styles.container}
            textContainerStyle={styles.input}
            placeholder="10 digit mobile number"
            onChangeFormattedText={onChangeValue}
            defaultValue={defaultValue}
            autoFocus
        />
    )
}

export default RNPhoneInput

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: scaler(10),
        overflow: 'hidden',
        borderColor: colors.colorPrimary,
        backgroundColor: colors.colorWhite,
        width: '100%',
        marginTop: scaler(10)
    },
    input: {
        backgroundColor: colors.colorWhite
    }
})