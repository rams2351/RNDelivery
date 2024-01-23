import { useFocusEffect } from '@react-navigation/native';
import { colors } from 'assets/Colors';
import { Images } from 'assets/image';
import React, { createRef, RefObject, useCallback, useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/Button';
import DisplayCard from 'src/components/DisplayCard';
import Text from 'src/components/Text';
import { actions } from 'src/redux/slices/reducer';
import { AppState } from 'src/types/interface';
import { DashboardScreens } from 'utils/Constant';
import { NavigationService } from 'utils/NavigationService';
import { scaler } from 'utils/Scaler';
import { _showSuccessMessage } from 'utils/Utils';

const Cart = () => {
    const { cart, user } = useSelector((state: AppState) => ({
        cart: state?.user.user?.cart,
        user: state.user.user
    }), shallowEqual)

    const [swipedItem, setSwipedItem] = useState<any>(null)
    const dispatch = useDispatch()
    const swipeRef: RefObject<Swipeable> = createRef()

    let rowRefs = new Map();

    const removeCartItem = useCallback((d: any) => {
        const filtered = cart.filter((_: any) => {
            if (_?.Id === d?.Id) return false
            else return true
        })


        swipeRef?.current?.close()
        dispatch(actions.updateCart({ id: user.Id, list: filtered }))
        _showSuccessMessage(<Text style={{ fontWeight: '600' }}>Item removed successfully!</Text>)
    }, [cart, swipeRef])

    useFocusEffect(useCallback(() => {
        if (!cart?.length) {
            NavigationService.navigate(DashboardScreens.HOME)
        }
        swipeRef?.current?.close()
    }, [cart]))

    const rightSwipeActions = useCallback((e: any, f: any) => {
        return (
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingHorizontal: scaler(50) }}>
                <TouchableOpacity style={{ backgroundColor: colors.colorPrimary, padding: 15, borderRadius: 50 }} onPress={() => {
                    removeCartItem(swipedItem)
                }}>
                    <Image source={Images.ic_delete} style={styles.cartImage} />
                </TouchableOpacity>
            </View>
        )
    }, [swipedItem])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.colorBackground }}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => NavigationService.goBack()}
                ><Image source={Images.ic_right_icon} style={styles.backIcon} />
                </TouchableOpacity>
                <View style={{ flex: 1, }}>
                    <Text style={styles.text}>Cart</Text>
                </View>
                <View style={styles.backIcon} />
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginVertical: scaler(10) }}>
                <Image source={Images.ic_swipe_text} style={{ width: '80%', height: 25 }} />
            </View>
            <FlatList
                style={{ padding: scaler(5) }}
                data={cart}
                keyExtractor={(_: any, i: number) => i.toString()}
                renderItem={({ item, index }) => (
                    <Swipeable
                        renderRightActions={rightSwipeActions}
                        ref={ref => {
                            if (ref && !rowRefs.get(index)) {
                                rowRefs.set(index, ref);
                                //@ts-ignore
                                swipeRef.current = ref
                            }
                        }}
                        onSwipeableWillOpen={(direction) => {
                            [...rowRefs.entries()].forEach(([key, ref]) => {
                                if (key !== index && ref) ref.close();
                            });
                            setSwipedItem(item)
                        }}
                    >
                        <View style={{ padding: scaler(10) }}>
                            <DisplayCard onPress={(e: any) => NavigationService.push(DashboardScreens.PRODUCT_DETAIL, { id: e })} {...item} />
                        </View>
                    </Swipeable>)}
            />

            <View style={styles.buttonPriceContainer}>
                <Button
                    title="Checkout"
                    buttonStyle={{}}
                />
            </View>
        </SafeAreaView>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: scaler(15),
        backgroundColor: colors.colorBackground
    },
    text: {
        fontSize: scaler(15),
        color: colors.colorPrimary,
        fontWeight: '800',
        textAlign: 'center',

    },
    cartContainer: {
        position: 'absolute',
        backgroundColor: colors.colorPrimary,
        top: Platform.OS === 'android' ? 20 : 55,
        right: 30,
        padding: 10,
        borderRadius: 50
    },
    cartImage: {
        height: scaler(25),
        width: scaler(25)
    },
    backIcon: {
        height: scaler(28),
        width: scaler(28)
    },
    buttonPriceContainer: {
        marginVertical: scaler(15),
        marginHorizontal: scaler(25)
    },

})