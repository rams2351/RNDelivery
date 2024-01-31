import { colors } from 'assets/Colors';
import React, { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';
import { scaler } from 'utils/Scaler';
import { _showErrorMessage } from 'utils/Utils';
import Popup from '../Popup';

interface AddNewAddressProps {
    open: boolean;
    onClose: () => void;
}

const AddNewAddress: React.FC<AddNewAddressProps> = (props) => {
    const { onClose, open } = props
    const [text, setText] = useState<string>('')
    const addHandler = useCallback(() => {
        if (!text.length) {
            _showErrorMessage('Please insert Address first!')
        } else {
            'add new address'
        }
    }, [])
    return (
        <Popup
            isOpen={open}
            onClose={onClose}
            title={'Delivery Address'}
            rightButtonText="Done"
            leftButtonText='Cancel'
            rightButtonAction={addHandler}
            leftButtonAction={onClose}
        >
            <View style={{ padding: 20 }}>
                <TextInput
                    onChangeText={setText}
                    style={{
                        padding: scaler(15),
                        borderWidth: scaler(1),
                        borderColor: colors.colorFocus,
                        borderRadius: scaler(10)
                    }}
                />
            </View>
        </Popup>
    )
}

export default AddNewAddress