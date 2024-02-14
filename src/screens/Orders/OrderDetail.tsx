import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import Card from 'src/components/Card'
import SummaryDetail from 'src/components/checkout/SummaryDetail'
import CustomHeader from 'src/components/CustomHeader'
import ListView from 'src/components/ListView'
import Popup from 'src/components/Popup'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState, IAssignedOrder } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NameFormatter, TimeFormatter } from 'utils/Helpers'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'

interface ICancelModal { data: IAssignedOrder | any; open: boolean; }

const OrderDetail = ({ route, navigation }: any) => {
    const orderId = route?.params?.orderId
    const dispatch = useDispatch()

    const { orderDetail } = useSelector((state: AppState) => ({
        orderDetail: state.delivery.orderDetail
    }), shallowEqual)

    const [cancelModal, setCancelModal] = useState<ICancelModal>({
        data: null,
        open: false
    })
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const handleCancelOrder = useCallback((item: IAssignedOrder) => {
        if (item.driverId) {
            dispatch(actions.assignOrder({ id: item.driverId, order: null, client: true }))
        }
        dispatch(actions.updateOrderStatus({ status: 'cancelled', driverId: 0, id: item.Id }))
        setCancelModal({ open: false, data: null })
        NavigationService.goBack()
    }, [])

    const refreshHandler = useCallback(() => {
        setRefreshing(true)
        dispatch(actions.getOrderDetail(orderId))
        setRefreshing(false)
    }, [orderDetail])

    useEffect(() => {
        if (orderId)
            dispatch(actions.getOrderDetail(orderId))
    }, [])

    return (
        <>
            <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.colorBackground }} >
                <CustomHeader title='Order Details' />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
                    }>
                    <Image alt="order detail" source={Images.ic_order_detail} style={styles.orderBg} />
                    {!orderDetail ? null : <>

                        <View style={styles.detailContainer}>
                            <Icon name="local-restaurant" size={25} color={colors.colorWhite} />
                            <Text style={[styles.heading, { color: colors.colorWhite, fontSize: scaler(18) }]}>Restaurant: {orderDetail?.orderFrom}</Text>
                        </View>
                        <Text style={styles.heading}>Order Status:</Text>
                        <Card style={styles.statusContainer}>
                            <View >
                                <Text style={[styles.infoText, { color: orderDetail.status == 'delivered' ? colors.colorSuccess : orderDetail.status == 'cancelled' ? colors.colorRed : colors.colorFocus }]}>Status: {NameFormatter(orderDetail?.status)}</Text>
                                {orderDetail.status == 'delivered' ? <Text style={styles.infoText}>Delivered on: {orderDetail.orderTime.date}</Text> : null}
                                {orderDetail.status == 'dispatched' ? <Text style={styles.infoText}>Remaining time: {TimeFormatter(orderDetail?.timeToDeliver)}</Text> : null}
                                <ListView heading='Deliver to' value={orderDetail?.deliverTo?.address} headingStyle={styles.infoText} valueStyle={{ marginTop: scaler(2) }} />
                                <ListView heading='Contact' value={orderDetail?.contact} headingStyle={styles.infoText} valueStyle={{ marginTop: scaler(2) }} />
                                <ListView heading='Payment method' value={orderDetail?.paymentMethod} headingStyle={styles.infoText} valueStyle={{ marginTop: scaler(2) }} />

                                {/* <Text style={styles.infoText}>Deliver to:  {orderDetail?.deliverTo?.address}</Text>
                                <Text style={styles.infoText}>Contact no.:  {orderDetail?.contact}</Text>
                                <Text style={styles.infoText}>Payment method:  {orderDetail?.paymentMethod}</Text> */}

                            </View>
                        </Card>
                        <Text style={styles.heading}>Product detail:</Text>
                        <Card style={styles.statusContainer}>
                            <SummaryDetail list={orderDetail.products} status={orderDetail.status} />
                        </Card>
                        {
                            orderDetail.status !== 'delivered' && orderDetail.status !== 'cancelled' ?
                                <Button title="Cancel order" buttonStyle={{ margin: scaler(15), marginVertical: scaler(10), paddingVertical: scaler(8) }} type="secondary"
                                    onPressButton={() => setCancelModal({ data: orderDetail, open: true })}
                                /> : null
                        }

                        {
                            orderDetail.status === 'dispatched' ?
                                <Button title="Track order" buttonStyle={{ margin: scaler(15), marginVertical: scaler(10), paddingVertical: scaler(10) }}
                                    onPressButton={() => NavigationService.push(DashboardScreens.TRACKING_MAP, { order: orderDetail })}
                                /> : null
                        }
                    </>}
                </ScrollView>
            </SafeAreaView>

            <Popup
                isOpen={cancelModal.open}
                onClose={() => setCancelModal({ data: null, open: false })}
                title={'Cancel Order'}
                leftButtonText={'No'}
                rightButtonText="Yes"
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

export default OrderDetail

const styles = StyleSheet.create({
    orderBg: {
        width: 'auto',
        height: scaler(200)
    },
    detailContainer: {
        backgroundColor: colors.colorFocus,
        padding: scaler(15),
        flexDirection: 'row',
        marginBottom: scaler(10)
    },
    infoText: {
        paddingLeft: scaler(15),
        fontWeight: '500',
        fontSize: scaler(15),
        paddingBottom: scaler(2)
    },
    statusContainer: {
        margin: scaler(10),
        marginVertical: scaler(15)
    },
    heading: {
        fontSize: scaler(18),
        fontWeight: '600',
        paddingHorizontal: scaler(15),
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