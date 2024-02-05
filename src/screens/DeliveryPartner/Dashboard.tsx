import { colors } from 'assets/Colors'
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { FlatList, Platform, RefreshControl, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Card from 'src/components/Card'
import CustomHeader from 'src/components/CustomHeader'
import Popup from 'src/components/Popup'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { scaler } from 'utils/Scaler'



const Dashboard = () => {
    const dispatch = useDispatch()
    const { driver, orderList } = useSelector((state: AppState) => ({
        orderList: state.delivery.ordersList,
        driver: state.user.user
    }), shallowEqual)
    const [confirmModal, setConfirmModal] = useState<any>({
        open: false,
        data: null
    })
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)

    useLayoutEffect(useCallback(() => {
        dispatch(actions.getPlacedOrders())
    }, []))

    let orders: Array<any> = useMemo(() => {
        return orderList?.filter((d) => d.Id != driver.Id)
    }, [orderList])

    const orderAcceptHandler = useCallback((item: any) => {
        dispatch(actions.updateOrderStatus({ status: 'dispatched', driverId: driver.Id, id: item.Id }))
        dispatch(actions.assignOrder({ id: driver.Id, order: item }))
        setConfirmModal({ data: null, open: false })
    }, [driver])

    const logoutHandler = useCallback(() => {
        dispatch(actions.setUserData(null))
        dispatch(actions.setLogin(false))
    }, [])


    const refreshHandler = useCallback(() => {
        setRefreshing(true)
        dispatch(actions.getPlacedOrders())
        setRefreshing(false)
    }, [])
    console.log(driver);

    return (
        <>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>
                <CustomHeader title='Home' showLeftIcon={false} />
                <View style={[styles.cartContainer, { position: 'absolute', top: Platform.OS === 'android' ? scaler(10) : scaler(40), right: scaler(30) }]}>
                    <Icon name='logout' size={27} color={colors.colorWhite} style={[{}]} onPress={() => setModalOpen(true)} />
                </View>
                {orders?.length > 0 ? (<View style={styles.container}>
                    <Text style={styles.heading}>Incoming  Orders</Text>
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
                        showsVerticalScrollIndicator={false}
                        data={orders.slice().reverse()}
                        keyExtractor={(e, i) => i.toString()}
                        renderItem={({ item }) => (
                            <Card style={styles.cardContainer}>
                                <View style={styles.orderContainer}>
                                    <View style={styles.cartContainer}>
                                        <Icon name='delivery-dining' size={30} color={'white'} style={styles.cartImage} />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>Restaurant: {item?.orderFrom}</Text>
                                        <Text style={styles.text}>No. of Items: {item?.products?.length}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.acceptButton} onPress={() => setConfirmModal({ open: true, data: item })}>
                                        <Text style={styles.acceptText}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        )}
                    />
                </View>) : <View>
                    <Text style={styles.text}>No orders yet!</Text>
                </View>}
            </SafeAreaView>

            <Popup
                isOpen={confirmModal.open}
                title="Accept Order?"
                rightButtonAction={() => orderAcceptHandler(confirmModal?.data)}
                rightButtonText='Yes'
                leftButtonAction={() => setConfirmModal({ open: false, data: null })}
                leftButtonText={'No'}
                onClose={() => setConfirmModal({ open: false, data: null })}>
                <View style={{ padding: scaler(10) }}>
                    <Text style={[styles.text, { textAlign: 'center' }]}>Accept this order?</Text>
                    <Text style={[styles.text, { textAlign: 'center' }]}>Restaurant: {confirmModal?.data?.orderFrom}</Text>
                    <Text style={[styles.text, { textAlign: 'center' }]}>No. of Items: {confirmModal?.data?.products?.length}</Text>
                </View>
            </Popup>
            <Popup
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={'Logout'}
                leftButtonText={'Cancel'}
                rightButtonText="Logout"
                leftButtonAction={() => setModalOpen(false)}
                rightButtonAction={logoutHandler}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Are you want to Logout from the Food App?</Text>
                </View>
            </Popup>
        </>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        fontSize: scaler(15),
        fontWeight: '600',
        padding: scaler(15),
        textAlign: 'center'
    },
    cardContainer: {
        margin: scaler(15)
    },
    orderContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cartContainer: {
        backgroundColor: colors.colorPrimary,
        padding: 10,
        borderRadius: 50
    },
    cartImage: {
        height: scaler(25),
        width: scaler(25)
    },
    textContainer: {
        marginLeft: scaler(10),
        flex: 1
    },
    text: {
        fontSize: scaler(12),
        fontWeight: '600',
    },
    acceptButton: {
        borderWidth: 1.5,
        borderColor: colors.colorFocus,
        padding: scaler(5),
        borderRadius: scaler(8),
        paddingHorizontal: scaler(10),
    },
    acceptText: {
        fontWeight: '500',
        color: colors.colorPrimary
    },
    modalContainer: {
        padding: scaler(15),
        display: 'flex',
        flexShrink: 1
    },
    modalText: {
        fontWeight: '600',
        color: colors.colorGreyInactive
    }
})