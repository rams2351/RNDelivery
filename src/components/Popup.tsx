import { colors } from 'assets/Colors';
import React, { ReactNode } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { scaler } from 'utils/Scaler';
import Button from './Button';
import Text from './Text';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode | React.ReactElement;
    title?: string;
    rightButtonText?: string;
    rightButtonAction?: () => void;
    leftButtonText?: string;
    leftButtonAction?: () => void;
}

const Popup: React.FC<ModalProps> = (props) => {
    const { isOpen, onClose, children, title, rightButtonAction, rightButtonText, leftButtonAction, leftButtonText } = props
    return (
        <Modal
            visible={isOpen}
            animationType="none"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.container} activeOpacity={1} onPress={onClose}>
                <TouchableOpacity style={styles.modalContainer} onPress={() => { }} activeOpacity={1}>
                    {title ? (
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{title}</Text>
                            {/* <TouchableOpacity activeOpacity={0.7} style={styles.closeIcon} onPress={onClose}> */}
                            <Icon name="close-circle-outline" size={25} onPress={onClose} style={{}} />
                            {/* </TouchableOpacity> */}
                        </View>
                    ) : null}
                    <View style={{ paddingVertical: 5 }}>
                        {children}
                    </View>
                    {rightButtonText || leftButtonText ? <View style={styles.buttonContainer}>
                        {leftButtonText ?
                            <Button title={leftButtonText} type="secondary" buttonStyle={[styles.button, styles.noButton]} textStyle={{ color: colors.colorPrimary, fontWeight: '500', fontSize: scaler(12) }} onPressButton={leftButtonAction} />
                            : null}
                        {rightButtonText ?
                            <Button title={rightButtonText} buttonStyle={[styles.button, { marginLeft: 'auto' }]} textStyle={{ fontWeight: '500', fontSize: scaler(12) }} onPressButton={rightButtonAction} />
                            : null}

                    </View> : null}
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

export default Popup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.colorD
    },
    modalContainer: {
        backgroundColor: colors.colorWhite,
        width: '85%',
        borderRadius: scaler(10)
    },
    titleContainer: {
        display: 'flex',
        padding: scaler(15),
        flexDirection: 'row',
        paddingHorizontal: scaler(15),
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: colors.colorGreyMore,

    },
    titleText: {
        fontWeight: '600',
        fontSize: scaler(15)
    },
    closeIcon: {
        borderWidth: 1,
        borderColor: colors.colorGreyMore,
        padding: scaler(1),
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        display: 'flex',
        padding: scaler(15),
        flexDirection: 'row',
        paddingHorizontal: scaler(15),
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: colors.colorGreyMore,
    },
    button: {
        paddingVertical: 0,
        marginVertical: 0,
        height: 35,
        paddingHorizontal: scaler(15),
    },
    noButton: {
        backgroundColor: colors.colorWhite,
        borderWidth: 1,
        borderColor: colors.colorPrimary,
    }
})