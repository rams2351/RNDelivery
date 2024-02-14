import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import Card from 'src/components/Card'
import CustomHeader from 'src/components/CustomHeader'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'

const ChangeAddress = () => {
    const { user } = useSelector((state: AppState) => ({
        user: state.user.user
    }), shallowEqual)
    const address = user.address
    const dispatch = useDispatch()
    const selectAddressHandler = useCallback((data: any) => {
        dispatch(actions.addAddress({ newAdd: data, key: 'change', id: user.Id }))
    }, [user])
    return (
        <SafeAreaView style={styles.safeAreaView} edges={['top']}>
            <CustomHeader title='Change Address' />
            <FlatList
                data={address}
                keyExtractor={(d, i) => i.toString()}
                contentContainerStyle={styles.container}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPressCard={() => selectAddressHandler(item)}>
                        <View style={styles.addressContainer}>
                            {user?.currentAddress.address == item?.address ? <Image source={Images.ic_check} style={[styles.checkImage]} /> : <Image source={Images.ic_uncheck} style={[styles.checkImage]} />}
                            <Text style={styles.text}>{item.address}</Text>
                        </View>
                    </Card>
                )}
            />
            <Button title="Add new address" buttonStyle={styles.button} onPressButton={() => NavigationService.push(DashboardScreens.ADD_NEW_ADDRESS)} />
        </SafeAreaView>
    )
}

export default ChangeAddress

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeAreaView: {
        backgroundColor: colors.colorBackground,
        flex: 1
    },
    addressContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
    },
    card: {
        margin: scaler(10)
    },
    checkImage: {
        height: scaler(15),
        width: scaler(15),
        marginTop: scaler(3)
    },
    text: {
        paddingHorizontal: scaler(10),
        color: colors.colorGreyInactive
    },
    button: {
        margin: scaler(15)
    }
})