import { useFocusEffect } from '@react-navigation/native'
import { colors, Images } from 'assets/alllll'
import React, { useCallback, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import CategoryTab from 'src/components/home/CategoryTab'
import SearchBar from 'src/components/home/SearchBar'
import ItemDisplayCard from 'src/components/ItemDisplayCard'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'
const { width } = Dimensions.get('screen')
const padding = 30

const Home = () => {
    const [activeTab, setActiveTab] = useState<string>('All')
    const { products, user } = useSelector((state: AppState) => ({
        products: state.products.products,
        user: state.user.user
    }
    ), shallowEqual)

    const scrollViewRef = useRef<FlatList>(null)


    const dispatch = useDispatch()
    useFocusEffect(useCallback(() => {
        dispatch(actions.getAllProducts())
        setActiveTab('All')
        scrollViewRef?.current?.scrollToOffset({ animated: true, offset: 0 })
        dispatch(actions.getUser(user?.Id))
    }, [])
    )

    const handleCategoryChange = useCallback((type: string) => {
        setActiveTab(type)
        scrollViewRef?.current?.scrollToOffset({ animated: true, offset: 0 })
        switch (type) {
            case 'Foods':
                dispatch(actions.getProductsByCategory(`vwpyg4ipcnsg09jz`))
                break;
            case 'Drinks':
                dispatch(actions.getProductsByCategory(`vw2wey7ikifg03dz`))
                break;
            case 'Snacks':
                dispatch(actions.getProductsByCategory(`vwpihhyum05e7iic`))
                break;
            case 'Burgers':
                dispatch(actions.getProductsByCategory(`vwnrk04bf970xsmx`))
                break;
            case 'Pizza':
                dispatch(actions.getProductsByCategory(`vwphdvbk8l4a0hfm`))
                break;
            default:
                dispatch(actions.getAllProducts())
                break;

        }
    }, [])
    const onScrollProduct = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {

        const containerWidth = e?.nativeEvent?.contentSize?.width;
        const itemsQty = containerWidth / 257;
        const re = containerWidth - e.nativeEvent.contentOffset.x
        // console.log(e.nativeEvent, itemsQty);
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
                tabList={['All', 'Foods', 'Drinks', 'Snacks', 'Burgers', 'Pizza']}
                onChangeTab={(e) => handleCategoryChange(e)}
                activeTab={activeTab}
            />

            <FlatList
                ref={scrollViewRef}
                keyExtractor={(_, i) => i?.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
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
        paddingTop: scaler(20),
        backgroundColor: colors.colorBackground

    },
    deliciousText: {
        fontSize: scaler(30),
        fontWeight: '700',
        paddingRight: scaler(80),
        color: colors.colorPrimary,
        lineHeight: 45,
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
        paddingRight: 30,
        paddingVertical: scaler(50)
    },
})