import { colors, Images } from 'assets/alllll';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { DateFormatter } from 'utils/all';
import { scaler } from 'utils/Scaler';

interface IDatePickerProps {
    defaultValue?: string;
    onChangeValue: (e: string) => void;
    title?: string;
}

const DatePicker = (props: IDatePickerProps) => {
    const { onChangeValue, defaultValue, title } = props
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false)
    const [dob, setDob] = useState<string>('')

    const { control, formState: { errors } } = useFormContext()

    const innerStyles = useMemo(() => {
        return {
            container: [
                //@ts-ignore
                styles.container, focus ? styles.focusedInput : {}, errors['dob']?.ref?.name === 'dob' ? {
                    borderColor: colors.colorRed,
                    backgroundColor: colors.colorFadedPrimary

                } : {}
            ],
            //@ts-ignore
            title: [styles.titleContainer, errors['dob']?.ref?.name === 'dob' ? {
                color: colors.colorErrorRed
            } : {}]
        }
    }, [focus, errors['dob']])

    const onFocusHandler = useCallback(() => {
        setFocus(true)
        setDatePickerVisibility(true)
    }, [])
    const onBlurHandler = useCallback(() => {
        setFocus(false)
        setDatePickerVisibility(false)
    }, [])
    const onConfirmHandler = useCallback((e: Date) => {
        setDob(DateFormatter(e))
        setDatePickerVisibility(false)
        onChangeValue(DateFormatter(e))
    }, [])


    return (
        <>
            {control ? (
                <>
                    <Controller
                        name='dob'
                        control={control}
                        render={({ field: { value, onBlur, onChange } }) => {
                            return (
                                <>
                                    <View>
                                        {title ? (<View><Text style={innerStyles.title}>{title}</Text></View>) : null}
                                        <View style={innerStyles.container}>
                                            <Image source={Images.calendar} style={styles.icon} />
                                            <TextInput
                                                style={styles.input}
                                                onFocus={onFocusHandler}
                                                onPressIn={onFocusHandler}
                                                onBlur={onBlurHandler}
                                                onChangeText={onChange}
                                                value={value}
                                                placeholderTextColor={colors.colorGreyMore}
                                                placeholder={'Date of birth'}
                                            />
                                        </View>
                                        <DateTimePicker
                                            isVisible={isDatePickerVisible}
                                            mode={'date'}
                                            onCancel={() => setDatePickerVisibility(false)}
                                            onConfirm={(e) => {
                                                onConfirmHandler(e)
                                                onChange(DateFormatter(e))
                                            }}
                                            maximumDate={new Date()}
                                            timePickerModeAndroid="spinner"
                                        />
                                    </View>

                                </>
                            )
                        }}

                    />
                </>
            ) : (
                <View>
                    <View style={innerStyles.container}>
                        <Image source={Images.calendar} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            onFocus={onFocusHandler}
                            onPressIn={onFocusHandler}
                            onBlur={onBlurHandler}
                            onChangeText={onChangeValue}
                            value={dob}
                            placeholderTextColor={colors.colorGreyMore}
                            placeholder={'Date of birth'}
                        />
                    </View>
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode={'date'}
                        onCancel={() => setDatePickerVisibility(false)}
                        onConfirm={onConfirmHandler}
                        maximumDate={new Date()}
                        timePickerModeAndroid="spinner"
                    />
                </View >
            )}
            {
                //@ts-ignore
                errors['dob']?.ref?.name === 'dob' ? <View style={styles.errorContainer}
                //@ts-ignore
                ><Text style={styles.errorMsg}>{errors['dob']?.message}</Text></View> : <View style={styles.errorContainer} />}
        </>
    )
}

export default DatePicker

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
        marginVertical: scaler(5)
    },
    icon: {
        height: scaler(25),
        width: scaler(25),
        resizeMode: 'contain',
        marginLeft: scaler(5)
    },
    errorContainer: {
        marginBottom: scaler(10)
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