import { colors, Images } from 'assets/alllll'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Button from 'src/components/Button'
import DisplayCard from 'src/components/DisplayCard'
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
    const wishListedProducts = products?.filter((d, i) => user?.wishlist?.includes(d?.Id))
    return (
        <View style={{ backgroundColor: colors.colorBackground, flex: 1 }}>
            {
                user?.wishlist?.length ? (
                    <>
                        <ScrollView contentContainerStyle={{ padding: scaler(30) }}>
                            {wishListedProducts.map((d: any, i: number) => (<DisplayCard key={i} {...d} onPress={(e: any) => NavigationService.push(DashboardScreens.PRODUCT_DETAIL, { id: e })} />))}
                        </ScrollView>
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
                    dispatch(actions.getProductDetail(`(Id,eq,${1})`))
                }}
                title={'Add to Favorites'}
                buttonStyle={{
                    marginHorizontal: scaler(20),
                    marginBottom: scaler(20)
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
    }
})