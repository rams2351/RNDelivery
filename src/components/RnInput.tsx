import { colors } from 'assets/alllll';
import React, { useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Image, ImageProps, KeyboardType, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { scaler } from 'utils/Scaler';

interface InputProps {
    name: string;
    placeholder?: string;
    defaultValue?: string;
    onChangeValue: (e: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    icon?: ImageProps;
    type?: KeyboardType;
    required?: boolean;
    title?: string;
}

const RnInput = (props: InputProps) => {
    const { placeholder, icon, onChangeValue, defaultValue, name, type, required, title } = props
    const [focus, setFocus] = useState<boolean>(false)

    const { control,
        formState: { errors, touchedFields }
    } = useFormContext()

    const innerStyles = useMemo(() => {
        return {
            container: [
                //@ts-ignore
                styles.container, focus ? styles.focusedInput : {}, errors[name]?.ref?.name === name ? {
                    borderColor: colors.colorRed,
                    backgroundColor: colors.colorFadedPrimary

                } : {}
            ],
            //@ts-ignore
            title: [styles.titleContainer, errors[name]?.ref?.name === name ? {
                color: colors.colorErrorRed
            } : {}]
        }
    }, [focus, errors[name]])


    return (
        <>
            {control ? (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onBlur, onChange, value, ref, name } }) => {
                        return (
                            <>
                                {title ? (<View><Text style={innerStyles.title}>{title}</Text></View>) : null}
                                <View style={innerStyles.container}>
                                    {icon ? <Image source={icon} style={styles.icon} /> : null}
                                    <TextInput
                                        keyboardType={type}
                                        style={styles.input}
                                        onFocus={(e) => { setFocus(true) }}
                                        onBlur={() => setFocus(false)}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={placeholder}
                                        placeholderTextColor={colors.colorGreyMore}
                                    />
                                </View>
                            </>
                        )
                    }}

                />
            ) : (<View style={innerStyles.container}>
                {icon ? <Image source={icon} style={styles.icon} /> : null}
                <TextInput
                    keyboardType={type}
                    style={styles.input}
                    onFocus={(e) => { setFocus(true) }}
                    onBlur={() => setFocus(false)}
                    onChangeText={onChangeValue}
                    value={defaultValue}
                    placeholder={placeholder}
                    placeholderTextColor={colors.colorGreyMore}
                />
            </View>)}
            {
                //@ts-ignore
                errors[name]?.ref?.name === name ? <View style={styles.errorContainer}
                //@ts-ignore
                ><Text style={styles.errorMsg}>{errors[name]?.message}</Text></View> : <View style={styles.errorContainer} />}
        </>
    )
}

export default RnInput

const styles = StyleSheet.create({
    input: {
        flex: 1,
        padding: scaler(10),
        fontSize: scaler(15),
        color: colors.colorBlackText
    },
    focusedInput: {
        borderColor: colors.colorFocus,
        shadowColor: colors.colorFadedPrimary
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.colorWhite,
        borderWidth: scaler(1),
        borderColor: colors.colorGreyInactive,
        borderRadius: scaler(6),
        padding: scaler(1),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowColor: colors.colorBackground,
    },
    icon: {
        height: scaler(25),
        width: scaler(25),
        resizeMode: 'contain',
        marginLeft: scaler(5)
    },
    errorContainer: {
        marginBottom: scaler(20)
    },
    errorMsg: {
        color: colors.colorErrorRed,
        fontWeight: '500',
        marginLeft: scaler(5),
        marginTop: scaler(1),
        fontStyle: 'italic'
    },
    titleContainer: {
        marginBottom: scaler(2),
        marginLeft: scaler(3),
        fontSize: scaler(13),
        fontWeight: '500',
        color: colors.colorBlackText
    }
})
