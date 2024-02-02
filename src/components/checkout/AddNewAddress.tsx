import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import Popup from '../Popup';
import RnInput from '../RnInput';

interface AddNewAddressProps {
    open: boolean;
    onClose: () => void;
}

const formSchema = yup.object({
    address: yup.string().required('Please enter a valid address!')
})

const AddNewAddress: React.FC<AddNewAddressProps> = (props) => {
    const { onClose, open } = props
    const [text, setText] = useState<string>('')

    const methods = useForm({
        resolver: yupResolver(formSchema)
    })


    const addHandler = useCallback(() => {

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
                <FormProvider {...methods}>
                    <Form render={() => (
                        <RnInput name='address' placeholder='Enter new address' />
                    )} />
                </FormProvider>
            </View>
        </Popup>
    )
}

export default AddNewAddress