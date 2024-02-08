import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Platform, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import CategoryTab from 'src/components/home/CategoryTab'
import SearchBar, { ISearchBar } from 'src/components/home/SearchBar'
import ItemDisplayCard from 'src/components/ItemDisplayCard'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'
const padding = 30

const Home = () => {
    const [activeTab, setActiveTab] = useState<string>('All')
    const [loading, setLoading] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const { products, user } = useSelector((state: AppState) => ({
        products: state.products.categoryProducts,
        user: state.user.user,
    }
    ), shallowEqual)

    const scrollViewRef = useRef<FlatList>(null)
    const searchRef = useRef<ISearchBar>()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getUser(user?.Id))
        dispatch(actions.getProductsByCategory({ link: `vwsmvu3tppwu7bkq`, loader: () => { } }))
    }, [])

    const onPageRefresh = useCallback(() => {
        setRefreshing(true)
        dispatch(actions.getAllProducts({ loader: () => { } }))
        setActiveTab('All')
        if (scrollViewRef?.current)
            scrollViewRef?.current?.scrollToOffset({ animated: true, offset: 0 })
        setRefreshing(false)
    }, [scrollViewRef])

    const handleCategoryChange = useCallback((type: string) => {
        setActiveTab(type)
        scrollViewRef?.current?.scrollToOffset({ animated: true, offset: 0 })
        switch (type) {
            case 'Foods':
                dispatch(actions.getProductsByCategory({ link: `vwpyg4ipcnsg09jz`, loader: setLoading }))
                break;
            case 'Drinks':
                dispatch(actions.getProductsByCategory({ link: `vw2wey7ikifg03dz`, loader: setLoading }))
                break;
            case 'Snacks':
                dispatch(actions.getProductsByCategory({ link: `vwpihhyum05e7iic`, loader: setLoading }))
                break;
            case 'Burgers':
                dispatch(actions.getProductsByCategory({ link: `vwnrk04bf970xsmx`, loader: setLoading }))
                break;
            case 'Pizza':
                dispatch(actions.getProductsByCategory({ link: `vwphdvbk8l4a0hfm`, loader: setLoading }))
                break;
            default:
                dispatch(actions.getProductsByCategory({ link: `vwsmvu3tppwu7bkq`, loader: setLoading }))
                break;
        }
    }, [])

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onPageRefresh} />}
        >
            <View style={styles.logoTextContainer}>
                <View style={styles.imageContainer}><Image source={Images.logo} style={styles.image} /></View>
                <View>
                    <Text style={styles.deliciousText}>Delicious </Text>
                    <Text style={styles.deliciousText}>food for you</Text>
                </View>
            </View>

            <SearchBar ref={searchRef} />

            <CategoryTab
                tabList={['All', 'Foods', 'Drinks', 'Snacks', 'Burgers', 'Pizza']}
                onChangeTab={(e) => handleCategoryChange(e)}
                activeTab={activeTab}
            />

            {loading ?
                (<View style={styles.loaderContainer}>
                    <ActivityIndicator color={colors.colorPrimary} size={Platform.OS == 'ios' ? 'large' : 35} />
                </View>
                ) :
                (<FlatList
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
                )
            }
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
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaler(10),
        borderRadius: 50,
        borderWidth: scaler(2),
        borderColor: colors.colorFocus,
        overflow: 'hidden',
        // marginTop: scaler(6)
    },
    logoTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaler(20),
    },
    scroll: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingVertical: scaler(50)
    },
    loaderContainer: {
        height: scaler(230),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})