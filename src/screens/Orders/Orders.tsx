import { colors, Images } from 'assets/alllll';
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Text from 'src/components/Text';
import { actions } from 'src/redux/slices/reducer';
import { AppState } from 'src/types/interface';
import { scaler } from 'src/utils/Scaler';
import { DashboardScreens, NameFormatter, TimeFormatter } from 'utils/all';
import { NavigationService } from 'utils/NavigationService';

const Orders = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const { user, orderList } = useSelector((state: AppState) => ({
        user: state.user.user,
        orderList: state.user.orders
    }), shallowEqual)

    let orders = orderList?.filter((_: any) => _.status === 'placed' && _.userId == user.Id)


    console.log(orders);

    useEffect(() => {
        dispatch(actions.getOrders())
    }, [])
    return (
        <View style={{ backgroundColor: colors.colorBackground, flex: 1 }}>
            {orders?.length ? (
                <>
                    <FlatList
                        data={orders.slice().reverse()}
                        style={{ padding: 10 }}
                        keyExtractor={(d, i) => i.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Card style={styles.cardStyle}>
                                <View style={styles.mainContainer}>
                                    <View>
                                        <Text style={styles.infoText}>Order From: {item?.orderFrom}</Text>
                                        <Text>Date: {item.orderTime.date}</Text>
                                        <Text>Item(s): {item.products?.length}</Text>
                                        <Text>Payment Method: {item?.paymentMethod}</Text>
                                        {item.status === 'On the way' ? <Text >Delivered in {TimeFormatter(item?.timeToDeliver + 15)}</Text> : null}
                                        <Text style={[styles.infoText, { color: item.status === 'delivered' ? colors.colorSuccess : colors.colorFocus }]}>Status: {NameFormatter(item.status)}</Text>
                                    </View>
                                    {
                                        item.status === 'on_the_way' ? (<TouchableOpacity activeOpacity={0.5} style={styles.trackIcon} >
                                            <Icon name='location-crosshairs' size={25} color={colors.colorPrimary} />
                                        </TouchableOpacity>) : null
                                    }
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
    },
    cardStyle: {
        margin: scaler(10),

    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'

    }, infoText: {
        fontWeight: '600',
        fontSize: scaler(12)
    },
    trackIcon: {
        marginTop: scaler(10)
    }
})