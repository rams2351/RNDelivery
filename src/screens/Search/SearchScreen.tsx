import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Entypo'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import CustomHeader from 'src/components/CustomHeader'
import DisplayCard from 'src/components/DisplayCard'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'

const SearchScreen = () => {
    const [focus, setFocus] = useState<boolean>(false)
    const [searchList, setSearchList] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const dispatch = useDispatch()
    const { products } = useSelector((state: AppState) => ({ products: state.products.products }), shallowEqual)
    const searchHandler = useCallback((e: string) => {
        let arr: any = []
        setText(e)
        if (e.length > 1) {
            products.forEach((d: any) => {
                if (d.name?.includes(e)) {
                    arr.push(d)
                } else if (d.category?.includes(e.toLowerCase())) {
                    arr.push(d)
                } else {
                    setSearchList(arr)
                }
            })
        } else {
            setSearchList(products)
        }
    }, [products])

    useEffect(() => {
        dispatch(actions.getAllProducts({ loader: setLoading }))
        setSearchList(products)
    }, [])
    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <CustomHeader title='Search' />
            <View style={[styles.container, focus ? styles.inputFocus : {}]}>
                <Image source={Images.ic_search} style={styles.image} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    autoFocus
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChangeText={searchHandler}
                />
                {loading ? <ActivityIndicator color={colors.colorPrimary} size={25} /> : false}
            </View>
            {
                searchList.length ? <FlatList
                    onScroll={() => focus ? setFocus(false) : null}
                    data={searchList}
                    style={{ paddingTop: scaler(10) }}
                    keyExtractor={(e, i) => i.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <>
                            <View style={styles.displayCard}>
                                <DisplayCard {...item} onPress={(e: any) => NavigationService.push(DashboardScreens.PRODUCT_DETAIL, { id: e })} />
                            </View>
                        </>
                    )}
                /> : <>
                    <View style={styles.textContainer}>
                        <Icon name='info-with-circle' size={22} color={colors.colorLink} style={{ marginHorizontal: scaler(5) }} />
                        <Text style={styles.noItemText}>{text.length ? 'No item found' : 'Search by name or category'}</Text>
                    </View>
                </>

            }
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.colorBackground
    },
    container: {
        backgroundColor: colors.colorWhite,
        borderRadius: scaler(25),
        marginHorizontal: scaler(20),
        shadowColor: colors.colorGreyInactive,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaler(18),
        elevation: 15,
        marginBottom: scaler(5)
    },
    input: {
        paddingVertical: scaler(15),
        paddingHorizontal: scaler(10),
        fontSize: scaler(15),
        color: colors.colorBlackText,
        flex: 1
    },
    image: {
        height: scaler(22),
        width: scaler(22)
    },
    inputFocus: {
        borderWidth: 2,
        borderColor: colors.colorFocus,
        shadowColor: colors.colorPrimary,
        shadowRadius: 4
    },
    displayCard: {
        margin: scaler(10),
        marginHorizontal: scaler(20),

    },
    noItemText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: scaler(15),
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scaler(20)

    }
})