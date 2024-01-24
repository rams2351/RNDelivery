import { colors, Images } from 'assets/alllll';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/Button';
import Text from 'src/components/Text';
import { AppState } from 'src/types/interface';
import { scaler } from 'src/utils/Scaler';
import { DashboardScreens, _showInfoMessage } from 'utils/all';
import { NavigationService } from 'utils/NavigationService';

const Orders = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const toast = useToast()

    const showToast = () => {
        _showInfoMessage('hello success')
    }

    const { user } = useSelector((state: AppState) => ({
        user: state.user.user
    }), shallowEqual)

    return (
        <View style={{ backgroundColor: colors.colorBackground, flex: 1 }}>
            {user?.orders?.length ? (
                <>

                </>
            ) : (
                <>
                    <View style={styles.container}>
                        <Image source={Images.ic_order_bg} style={styles.image} />
                        <Text style={styles.text}>No Orders yet</Text>
                        <Text numberOfLines={2} style={styles.textDescription}>Hit the orange button down below to create an order</Text>
                    </View>
                    <Button
                        title={'Start ordering'}
                        onPressButton={() => NavigationService.navigate(DashboardScreens.BOTTOM_NAVIGATOR, { screen: DashboardScreens.HOME })}
                        buttonStyle={{
                            marginHorizontal: scaler(20),
                            marginBottom: scaler(20)
                        }}
                    />
                </>
            )}
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: scaler(100),
        width: scaler(100),
    },
    text: {
        fontSize: scaler(25),
        fontWeight: '700',
        color: colors.colorBlackText,
        marginTop: scaler(10)
    },
    textDescription: {
        paddingHorizontal: scaler(70),
        textAlign: 'center',
        marginTop: scaler(15),
        fontSize: scaler(14),
        // fontWeight: '600',
        color: colors.colorGreyMore
    }
})