import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import FavoriteSvg from 'assets/svg/FavoriteSvg'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { scaler } from 'src/utils/Scaler'
import { DashboardScreens } from 'utils/Constant'
import { CurrencyFormatter, TimeFormatter, _showSuccessMessage } from 'utils/Helpers'
import { NavigationService } from 'utils/NavigationService'

const ProductDetail = ({ route, navigation }: any) => {
    const dispatch = useDispatch()
    const id = route?.params?.id
    const { product, user } = useSelector((state: AppState) => ({
        product: state.products.productDetail,
        user: state.user.user
    }), shallowEqual)
    const wishListed = user?.wishlist?.includes(id)
    const [qty, setQty] = useState<number>(1)
    const [loader, setLoader] = useState<boolean>(false)
    const [qtyLoader, setQtyLoader] = useState<boolean>(false)
    const [addCartLoader, setAddCartLoader] = useState<boolean>(false)

    const isAddedToCart = useMemo(() => {
        return user?.cart?.filter((_: any) => _.Id === product?.Id)?.[0]?.Id
    }, [user, product])
    const cartItem = useMemo(() => {
        return user?.cart?.filter((_: any) => _?.Id === product?.Id)?.[0]
    }, [user])

    const wishlistHandler = useCallback(() => {
        let filtered = user.wishlist ?? []
        if (filtered) {
            if (filtered.includes(product.Id)) {
                filtered = filtered.filter((_: any) => _ != product.Id)
                _showSuccessMessage('Item removed from favorites')
            } else {
                filtered = [...filtered, product.Id]
                _showSuccessMessage('Item added to favorites')
            }
        } else {
            filtered = [product.Id]
        }
        // return
        dispatch(actions.updateWishlist({ id: user.Id, list: filtered, loader: setLoader }))

    }, [product, user])

    const addToCartHandler = useCallback(() => {
        let payload = {
            ...product,
            qty
        }
        const cartItems = [...user?.cart, payload]
        dispatch(actions.updateCart({ id: user?.Id, list: cartItems, loader: setAddCartLoader }))
        _showSuccessMessage(`Item added successfully!`)

    }, [user, qty, product])

    const qtyHandler = useCallback((id: number, qty: number, type: string) => {
        let newQty = qty;
        if (type === "+") {
            newQty += 1
        } else {
            newQty -= 1
        }
        setQty(newQty)

        let pay = user?.cart.map((d: any) => {
            if (d.Id == id) {
                return {
                    ...d,
                    qty: newQty
                }
            } else return d
        })
        dispatch(actions.updateCart({ id: user?.Id, list: pay, loader: setQtyLoader }))
    }, [user, product])

    useEffect(() => {
        dispatch(actions.getProductDetail(`(Id,eq,${id})`))
        console.log('called');

    }, [id])

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => NavigationService.goBack()}
                ><Image source={Images.ic_right_icon} style={styles.backIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={wishlistHandler} disabled={loader}>
                    {loader ? <ActivityIndicator color={colors.colorPrimary} size={25} style={styles.favIcon} /> : wishListed ? <FavoriteSvg color={colors.colorRed} fill={colors.colorRed} style={styles.favIcon} /> :
                        <FavoriteSvg color={colors.colorBlack} style={styles.favIcon} />
                    }
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
                <View style={styles.imageTextContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={Images.orders} src={product?.img[0]?.signedUrl} style={styles.image} />
                    </View>
                    <View style={{ width: '80%', paddingBottom: scaler(5) }}>
                        {product?.veg == 1 ? <Image source={Images.orders} style={styles.backIcon} src="https://img.icons8.com/fluency/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol" />
                            :
                            <Image style={styles.backIcon} source={Images.orders} src="https://img.icons8.com/fluency/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol" />
                        }
                    </View>
                    <Text numberOfLines={3} style={styles.text}>{product?.name}</Text>
                    <Text style={styles.price}>{CurrencyFormatter(product?.price)}</Text>
                </View>

                <View style={{ paddingHorizontal: scaler(30) }}>
                    <Text style={styles.descHeading}>Product Details</Text>
                    <Text style={styles.desc} >{product?.origin}</Text>
                    {product?.prepTime > 0 ? <Text style={styles.desc} >Preparation time: {TimeFormatter(product?.prepTime)}</Text> : null}
                    <Text style={styles.desc} >{product?.description}</Text>

                    <Text style={styles.descHeading}>Delivery Information</Text>
                    <Text style={styles.desc} >{product?.description}</Text>
                </View>
            </ScrollView>
            <View style={{
                marginHorizontal: scaler(20),
                marginTop: isAddedToCart ? scaler(10) : 0
            }}>
                {
                    isAddedToCart ?
                        (
                            <View style={styles.buttonContainer}>
                                <View style={styles.groupButtonContainer}>
                                    <TouchableOpacity style={styles.actionButton} activeOpacity={0.7} onPress={() => qty > 1 ? qtyHandler(product?.Id, cartItem?.qty, '-',) : null} disabled={qty == 1}>
                                        <Text style={styles.actionText}>-</Text>
                                    </TouchableOpacity>
                                    <View style={styles.qtyContainer}>{qtyLoader ? <ActivityIndicator color={colors.colorPrimary} size={25} /> : <Text style={styles.qtyText}>{cartItem?.qty}</Text>}</View>
                                    <TouchableOpacity style={styles.actionButton} activeOpacity={0.7} onPress={() => qtyHandler(product?.Id, cartItem?.qty, '+')}>
                                        <Text style={styles.actionText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <Button title="Go to Cart"
                                    onPressButton={() => NavigationService.push(DashboardScreens.CART)}
                                    buttonStyle={{ paddingHorizontal: 20, height: scaler(35), paddingVertical: 0 }}
                                />
                            </View>
                        )
                        : (
                            <Button
                                onPressButton={addToCartHandler}
                                title={addCartLoader ? <ActivityIndicator size={25} color={colors.colorWhite} /> : isAddedToCart ? 'Go to' : 'Add to Cart'}
                                buttonStyle={{}}
                                containerStyle={{ paddingBottom: scaler(10) }}
                            />
                        )
                }
            </View>

        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: colors.colorBackground

    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: scaler(15),
    },
    backIcon: {
        height: scaler(25),
        width: scaler(25)
    },
    favIcon: {
        marginRight: scaler(10)
    },
    container: {
        paddingVertical: scaler(15)
    },
    image: {
        height: scaler(180),
        width: scaler(180),
        borderRadius: 100,
    },
    imageContainer: {
        height: scaler(180),
        width: scaler(180),
        borderRadius: 100,
        backgroundColor: colors.colorBackground,
        shadowColor: colors.colorBlack,
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        resizeMode: 'contain',
    },
    text: {
        flexWrap: 'wrap',
        fontSize: scaler(25),
        textAlign: 'center',
        fontWeight: '700',
        paddingHorizontal: scaler(20),
        color: colors.colorBlackText,
        maxHeight: scaler(50),
        marginBottom: scaler(20)
    },
    price: {
        marginBottom: scaler(45),
        fontSize: scaler(22),
        fontWeight: '700',
        color: colors.colorPrimary
    },
    imageTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    desc: {
        color: colors.colorGreyInactive,
        fontSize: scaler(13),
        marginBottom: scaler(10),
        lineHeight: 23
    },
    descHeading: {
        fontSize: scaler(16),
        fontWeight: '600',
        color: colors.colorBlack,
        marginBottom: scaler(5)
    },
    groupButtonContainer: {
        borderRadius: scaler(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: scaler(15)
    },
    actionButton: {
        backgroundColor: colors.colorPrimary,
        width: scaler(45),
        height: scaler(35),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.colorPrimary,
        borderWidth: 1,
        overflow: 'hidden'
    },
    qtyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: scaler(45),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.colorPrimary,

    },
    actionText: {
        fontSize: scaler(15),
        fontWeight: '700',
        color: colors.colorWhite
    },
    qtyText: {
        fontSize: scaler(15),
        fontWeight: '600',
    }
})