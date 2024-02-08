import { useFocusEffect } from '@react-navigation/native';
import { colors } from 'assets/Colors';
import { Images } from 'assets/image';
import React, { createRef, RefObject, useCallback, useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/Button';
import CustomHeader from 'src/components/CustomHeader';
import DisplayCard from 'src/components/DisplayCard';
import { actions } from 'src/redux/slices/reducer';
import { AppState, IProduct } from 'src/types/interface';
import { DashboardScreens } from 'utils/Constant';
import { _showSuccessMessage } from 'utils/Helpers';
import { NavigationService } from 'utils/NavigationService';
import { scaler } from 'utils/Scaler';

const Cart = () => {
    const { cart, user } = useSelector((state: AppState) => ({
        cart: state?.user.user?.cart,
        user: state.user.user
    }), shallowEqual)

    const [swipedItem, setSwipedItem] = useState<IProduct | any>(null)
    const [qtyLoader, setQtyLoader] = useState<boolean>(false)
    const dispatch = useDispatch()
    const swipeRef: RefObject<Swipeable> = createRef()

    let rowRefs = new Map();

    const removeCartItem = useCallback((d: any) => {
        const filtered = cart.filter((_: any) => {
            if (_?.Id === d?.Id) return false
            else return true
        })
        let list = [...rowRefs.entries()]
        dispatch(actions.updateCart({ id: user.Id, list: filtered, loader: () => { } }))
        _showSuccessMessage(`Item removed successfully!`)
        list.forEach(([key, ref]) => {
            ref.close();
        })
    }, [cart, rowRefs])

    useFocusEffect(useCallback(() => {
        if (!cart?.length) {
            NavigationService.navigate(DashboardScreens.HOME)
        }
    }, [cart]))

    const rightSwipeActions = useCallback((e: any, f: any) => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: scaler(50) }}>
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
            <CustomHeader title='Cart' />
            <FlatList
                style={{ padding: scaler(5) }}
                data={cart}
                keyExtractor={(_: any, i: number) => i.toString()}
                renderItem={({ item, index }) => (
                    <>
                        {index == 0 ? <View style={styles.swipeImageContainer}>
                            <Image source={Images.ic_swipe_text} style={styles.swipeImage} />
                        </View> : null}
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
                        </Swipeable>
                    </>
                )}
            />
            <View style={styles.buttonPriceContainer}>
                <Button
                    title="Checkout"
                    buttonStyle={{}}
                    onPressButton={() => NavigationService.push(DashboardScreens.CHECKOUT)}
                // onPressButton={() => NavigationService.push('practice')}

                />
            </View>
        </SafeAreaView>
    )
}

export default Cart

const styles = StyleSheet.create({
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
    buttonPriceContainer: {
        marginVertical: scaler(15),
        marginHorizontal: scaler(25)
    },
    swipeImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: scaler(10)
    },
    swipeImage: {
        width: '80%',
        height: 25
    }
})