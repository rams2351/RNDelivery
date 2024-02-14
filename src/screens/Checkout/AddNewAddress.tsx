import { yupResolver } from '@hookform/resolvers/yup'
import { colors } from 'assets/Colors'
import React, { useCallback, useEffect, useState } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import CustomHeader from 'src/components/CustomHeader'
import RnInput from 'src/components/RnInput'
import { actions } from 'src/redux/slices/reducer'
import { AppState, ILatLng } from 'src/types/interface'
import { useLocationService } from 'utils/LocationService'
import { scaler } from 'utils/Scaler'
import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup.string().required('Name is required!'),
    lane: yup.string().required('Lane is required!'),
    road: yup.string().required('Road is required!'),
    phone: yup.string().required('Mobile is required!'),
    zip: yup.string().required('Postal code is required!')
})

const AddNewAddress = () => {
    const { user } = useSelector((state: AppState) => ({
        user: state.user.user
    }), shallowEqual)
    const [location, setLocation] = useState<ILatLng>()
    const dispatch = useDispatch()
    const method = useForm(
        {
            mode: 'onChange',
            resolver: yupResolver(formSchema)
        }
    )
    const { handleSubmit, setValue } = method
    const addNewAddress = useCallback((data: any) => {
        let payload = {
            address: data.name + ", " + data.lane + ", " + data.road + ", " + data.zip + ", " + data.phone,
            location: location,
            phone: data.phone
        }
        console.log(payload);
        dispatch(actions.addAddress({ newAdd: payload, id: user?.Id, key: 'add' }))
    }, [location, user])
    useEffect(() => {
        setValue('name', user.firstName)
        setValue('phone', user.phone)
        useLocationService().then(res => setLocation(res as ILatLng))
    }, [])

    return (
        <SafeAreaView edges={['top']} style={styles.safeAreaView} >
            <CustomHeader title='Add Address' />
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <FormProvider {...method} >
                    <Form
                        noValidate
                        onSubmit={handleSubmit(addNewAddress) as any}
                        render={({ submit }) => {
                            return (<>
                                <RnInput name='name' title='Name' />
                                <RnInput name='phone' title='Phone' />
                                <RnInput name='lane' title='Lane' />
                                <RnInput name='road' title='Road' />
                                <RnInput name='zip' title='Zip' />
                                <Button title="Add address" onPressButton={submit as any} />
                            </>)
                        }}

                    />
                </FormProvider>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default AddNewAddress

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: 'rgba(0, 0, 0, 0.04)', // Black color with 50% opacity
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     padding: 50,
    //     margin: 20,
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     borderColor: 'rgba(0, 0, 0, 0.2)'

    // },
    safeAreaView: {
        backgroundColor: colors.colorBackground,
        flex: 1
    },
    container: {
        padding: scaler(10),
        paddingHorizontal: scaler(20)
    }
});