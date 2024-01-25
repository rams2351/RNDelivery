import { colors, Images } from 'assets/alllll';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/Button';
import CardView from 'src/components/CardView';
import Text from 'src/components/Text';
import { AppState } from 'src/types/interface';
import { scaler } from 'src/utils/Scaler';
import { DashboardScreens } from 'utils/all';
import { NavigationService } from 'utils/NavigationService';

const Orders = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state: AppState) => ({
        user: state.user.user
    }), shallowEqual)
    const orders = user?.orders

    return (
        <View style={{ backgroundColor: colors.colorBackground, flex: 1 }}>
            {orders?.length ? (
                <>
                    <FlatList
                        data={orders}
                        style={{ padding: 10 }}
                        keyExtractor={(d, i) => i.toString()}
                        ItemSeparatorComponent={() => <View style={{ marginVertical: scaler(10) }} />}
                        renderItem={({ item }) => (
                            <View>
                                <CardView
                                    cardElevation={3}
                                    cardMaxElevation={2}
                                    cornerRadius={15}
                                    style={styles.cardStyle}
                                >
                                    <View>
                                        {/* <Text>Status-# Preparing in {item.products[0].prepTime} mins</Text> */}

                                        <Text>Date: {item.orderTime.date}</Text>
                                        <Text>Items: {item.products?.length}</Text>
                                    </View>
                                    <View>
                                        {/* <Image /> */}
                                    </View>
                                </CardView>
                            </View>
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
        backgroundColor: colors.colorWhite,
        padding: scaler(15),
        marginHorizontal: scaler(10)
    }
})