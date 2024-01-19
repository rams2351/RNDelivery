import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import FavoriteSvg from 'assets/svg/FavoriteSvg'
import React, { useCallback, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { scaler } from 'src/utils/Scaler'
import { NavigationService } from 'utils/NavigationService'
import { CurrencyFormatter } from 'utils/Utils'

const ProductDetail = ({ route, navigation }: any) => {

    const dispatch = useDispatch()
    const id = route?.params?.id

    const product = useSelector((state: AppState) => state.products.productDetail)
    const user = useSelector((state: AppState) => state.user.user)

    const wishListed = user?.wishlist?.includes(id)

    useEffect(() => {
        if (product?.Id === id) {
            return
        }
        dispatch(actions.getProductDetail(`(Id,eq,${id})`))
    }, [id, product])


    const wishlistHandler = useCallback(() => {
        let filtered = user.wishlist ?? []
        if (filtered) {
            if (filtered.includes(product.Id)) {
                filtered = filtered.filter((_: any) => _ != product.Id)
            } else {
                filtered = [...filtered, product.Id]
            }
        } else {
            filtered = [product.Id]
        }
        dispatch(actions.updateWishlist({ id: user.Id, list: filtered }))

    }, [product, user])

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => NavigationService.goBack()}
                ><Image source={Images.ic_right_icon} style={styles.backIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={wishlistHandler}>
                    {wishListed ? <FavoriteSvg color={colors.colorRed} fill={colors.colorRed} style={styles.favIcon} /> :
                        <FavoriteSvg color={colors.colorBlack} style={styles.favIcon} />
                    }
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.imageTextContainer}>
                    <View style={styles.imageContainer}>
                        <Image src={product.img[0]?.signedUrl} style={styles.image} />
                    </View>
                    <View style={{ display: 'flex', width: '80%', paddingBottom: scaler(5) }}>
                        {product?.category?.veg == 1 ? <Image style={styles.backIcon} src="https://img.icons8.com/fluency/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol" />
                            :
                            <Image style={styles.backIcon} src="https://img.icons8.com/fluency/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol" />
                        }
                    </View>
                    <Text numberOfLines={3} style={styles.text}>{product?.name}</Text>
                    <Text style={styles.price}>{CurrencyFormatter(product?.price)}</Text>
                </View>

                <View style={{ paddingHorizontal: scaler(30) }}>
                    <Text style={styles.descHeading}>Product Details</Text>
                    <Text style={styles.desc} >{product?.origin?.name}</Text>
                    <Text style={styles.desc} >{product?.description}</Text>

                    <Text style={styles.descHeading}>Delivery Information</Text>
                    <Text style={styles.desc} >{product?.description}</Text>
                </View>
            </ScrollView>
            <Button
                title={'Add to Cart'}
                buttonStyle={{
                    marginHorizontal: scaler(20),
                    marginVertical: scaler(5)
                }}
            />
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
        display: 'flex',
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
        display: 'flex',
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
    }
})