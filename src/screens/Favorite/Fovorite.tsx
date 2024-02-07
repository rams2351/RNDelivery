import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { createRef, RefObject, useCallback, useState } from 'react'
import { FlatList, Image, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import DisplayCard from 'src/components/DisplayCard'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'

const Favorite = () => {
    const dispatch = useDispatch()
    const { user, products } = useSelector((state: AppState) => ({
        user: state.user.user,
        products: state.products.products
    }), shallowEqual)
    const swipeRef: RefObject<Swipeable> = createRef()
    let rowRefs = new Map();
    const wishListedProducts = products?.filter((d, i) => user?.wishlist?.includes(d?.Id))
    const [swipedItem, setSwipedItem] = useState<any>(null)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    // console.log(wishListedProducts);

    const removeWishListed = useCallback(async (d: any) => {
        let filtered = user?.wishlist?.filter((_: any) => _ != d.Id)
        dispatch(actions.setLoading(true))
        dispatch(actions.updateWishlist({ id: user.Id, list: filtered, loader: setLoading }))

    }, [wishListedProducts])


    const rightSwipeActions = useCallback((e: any, f: any) => {
        return (
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingHorizontal: scaler(50) }}>
                <TouchableOpacity style={{ backgroundColor: colors.colorPrimary, padding: 15, borderRadius: 50 }} onPress={() => {
                    removeWishListed(swipedItem)
                }}>
                    <Image source={Images.ic_delete} style={styles.cartImage} />
                </TouchableOpacity>
            </View>
        )
    }, [swipedItem])

    // useFocusEffect(useCallback(() => {
    //     dispatch(actions.getAllProducts())
    // }, []))

    const onRefreshPage = useCallback(() => {
        setRefreshing(true)
        dispatch(actions.getAllProducts())
        setRefreshing(false)
    }, [])

    return (
        <View style={{ backgroundColor: colors.colorBackground, flex: 1 }}>
            {
                user?.wishlist?.length ? (
                    <>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginVertical: scaler(10) }}>
                            <Image source={Images.ic_swipe_text} style={{ width: '80%', height: 25 }} />
                        </View>
                        <FlatList
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshPage} />}
                            style={{ padding: scaler(5) }}
                            data={wishListedProducts}
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
                    </>
                ) : (
                    <View style={styles.container}>

                        <Image source={Images.heart} style={styles.image} />
                        <Text style={styles.text}>No Favorites yet</Text>
                        <Text numberOfLines={2} style={styles.textDescription}>Hit the orange button down below to add Favorite</Text>

                    </View>
                )
            }
            <Button
                onPressButton={() => {
                    NavigationService.replace('BottomNavigation', { screen: DashboardScreens.HOME })
                }}
                title={'Add to Favorites'}
                buttonStyle={{
                    marginHorizontal: scaler(20),
                    marginVertical: scaler(5),
                    // marginBottom: scaler(20)
                }}
            />

        </View>
    )
}

export default Favorite

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
    cartImage: {
        height: scaler(25),
        width: scaler(25)
    },
})