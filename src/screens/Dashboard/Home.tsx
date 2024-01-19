import { colors, Images } from 'assets/alllll'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import CategoryTab from 'src/components/home/CategoryTab'
import SearchBar from 'src/components/home/SearchBar'
import ItemDisplayCard from 'src/components/ItemDisplayCard'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'

const { width } = Dimensions.get('screen')
const padding = 30

const Home = () => {
    const [activeTab, setActiveTab] = useState<string>('Foods')
    const { products, user } = useSelector((state: AppState) => ({
        products: state.products.products,
        user: state.user.user
    }
    ), shallowEqual)

    const scrollViewRef = useRef<FlatList>(null)


    const dispatch = useDispatch()
    useEffect(() => {
        // if (!products?.length) {
        dispatch(actions.getAllProducts())
        // }s
    }, [])

    const onScrollProduct = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {

        const containerWidth = e?.nativeEvent?.contentSize?.width;
        const itemsQty = containerWidth / 257;
        const re = containerWidth - e.nativeEvent.contentOffset.x
        console.log(e.nativeEvent, itemsQty);
        if (scrollViewRef.current) {
            // scrollViewRef.current.scrollToItem({ item: 1, animated: true })
        }
    }, [scrollViewRef])

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.logoTextContainer}>
                <View style={styles.imageContainer}><Image source={Images.logo} style={styles.image} /></View>
                <View>
                    <Text style={styles.deliciousText}>Delicious </Text>
                    <Text style={styles.deliciousText}>food for you</Text>
                </View>
            </View>

            <SearchBar />

            <CategoryTab
                tabList={['Foods', 'Drinks', 'Snacks', 'Sauces', 'Burgers', 'Pizza']}
                onChangeTab={(e) => setActiveTab(e)}
                activeTab={activeTab}
            />

            <FlatList
                ref={scrollViewRef}
                // onScrollEndDrag={(e) => onScrollProduct(e)}
                // snapToOffsets={products?.map((_, i) => i * width - padding * 20)}
                keyExtractor={(_, i) => i?.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                // style={styles.scroll}
                // contentContainerStyle={{ paddingHorizontal: products?.length > 1 ? padding : 0 }}
                contentContainerStyle={styles.scroll}
                ItemSeparatorComponent={
                    () => { return <View style={{ width: padding }} /> }
                }
                data={products}
                renderItem={({ item: d, index: i }) => (
                    <ItemDisplayCard
                        key={i}
                        img={d.img[0].signedUrl}
                        title={d.name}
                        price={d?.price}
                        onPressItem={(e) => NavigationService.push(DashboardScreens.PRODUCT_DETAIL, { id: d?.Id })}
                    />
                )}
            />


        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: scaler(20),
        // paddingLeft: scaler(35),
        // paddingTop: scaler(50)
        backgroundColor: colors.colorBackground

    },
    deliciousText: {
        fontSize: scaler(35),
        fontWeight: '700',
        paddingRight: scaler(80),
        color: colors.colorPrimary,
    },
    image: {
        height: scaler(50),
        width: scaler(50),
        marginLeft: scaler(8)
    },
    imageContainer: {
        backgroundColor: colors.colorWhite,
        height: scaler(60),
        width: scaler(60),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaler(10),
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.colorFocus,
        overflow: 'hidden',
        marginTop: scaler(5)
    },
    logoTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: scaler(20),
    },
    scroll: {
        paddingLeft: 30,
        paddingRight: 30
    },
})