import { colors } from 'assets/Colors';
import { Images } from 'assets/image';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Popup from 'src/components/Popup';
import Text from 'src/components/Text';
import { actions } from 'src/redux/slices/reducer';
import { AppState } from 'src/types/interface';
import { scaler } from 'src/utils/Scaler';
import { DashboardScreens } from 'utils/Constant';
import { NameFormatter, TimeFormatter } from 'utils/Helpers';
import { NavigationService } from 'utils/NavigationService';
const Orders = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const [cancelModal, setCancelModal] = useState<any>({
        data: null,
        open: false
    })
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const { user, orderList } = useSelector((state: AppState) => ({
        user: state.user.user,
        orderList: state.delivery.ordersList
    }), shallowEqual)

    let orders = orderList?.filter((_: any) => _.userId == user.Id)


    const handleCancelOrder = useCallback((item: any) => {
        if (item.driverId) {
            dispatch(actions.assignOrder({ id: item.driverId, order: null, client: true }))
        }
        dispatch(actions.updateOrderStatus({ status: 'cancelled', driverId: 0, id: item.Id }))
        setCancelModal({ open: false, data: null })
    }, [])

    useLayoutEffect(useCallback(() => {
        dispatch(actions.getOrderList())
    }, []))

    const refreshHandler = useCallback(() => {
        setRefreshing(true)
        dispatch(actions.getOrderList())
        setRefreshing(false)
    }, [])

    return (
        <>
            <View style={{ backgroundColor: colors.colorBackground, flex: 1 }}>
                {orders?.length ? (
                    <>
                        <FlatList
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
                            }
                            data={orders.slice().reverse()}
                            style={{ padding: 0 }}
                            keyExtractor={(d, i) => i.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Card style={styles.cardStyle} onPressCard={() => NavigationService.push(DashboardScreens.ORDER_DETAIL, { orderId: item.Id })} >
                                    <View style={styles.mainContainer}>
                                        <View>
                                            <Text style={styles.infoText}>Order From: {item?.orderFrom}</Text>
                                            <Text>Date: {item.orderTime.date}</Text>
                                            <Text>Item(s): {item.products?.length}</Text>
                                            {item.status === 'dispatched' ? <Text >Delivered in {TimeFormatter(parseInt(item?.timeToDeliver))}</Text> : null}
                                            <Text style={[styles.infoText, { color: item.status === 'delivered' ? colors.colorSuccess : item.status == 'cancelled' ? colors.colorRed : colors.colorFocus }]}>Status: {NameFormatter(item.status)}</Text>
                                        </View>
                                    </View>
                                </Card>
                            )}
                        />
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



            <Popup
                isOpen={cancelModal.open}
                onClose={() => setCancelModal({ data: null, open: false })}
                title={'Cancel Order'}
                leftButtonText={'No'}
                rightButtonText="Cancel"
                leftButtonAction={() => setCancelModal({ data: null, open: false })}
                rightButtonAction={() => handleCancelOrder(cancelModal?.data)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Are you want to cancel this order?</Text>
                </View>
            </Popup>

        </>
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
        marginTop: scaler(10),
        textAlign: 'center'
    },
    textDescription: {
        paddingHorizontal: scaler(70),
        textAlign: 'center',
        marginTop: scaler(15),
        fontSize: scaler(14),
        // fontWeight: '600',
        color: colors.colorGreyMore
    },
    cardStyle: {
        margin: scaler(10),

    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'flex-start'

    }, infoText: {
        fontWeight: '600',
        fontSize: scaler(12)
    },
    trackIcon: {
        marginTop: scaler(10)
    },
    modalContainer: {
        padding: scaler(15),
        display: 'flex',
        flexShrink: 1
    },
    modalText: {
        fontWeight: '600',
        color: colors.colorGreyInactive
    },
})