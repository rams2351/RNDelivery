import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback, useState } from 'react'
import { FlatList, Image, StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Entypo'
import { shallowEqual, useSelector } from 'react-redux'
import CustomHeader from 'src/components/CustomHeader'
import DisplayCard from 'src/components/DisplayCard'
import Text from 'src/components/Text'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'

const SearchScreen = () => {
    const [focus, setFocus] = useState<boolean>(false)
    const [searchList, setSearchList] = useState<any>([])
    const [text, setText] = useState<string>('')

    const { products } = useSelector((state: AppState) => ({ products: state.products.products }), shallowEqual)
    const searchHandler = useCallback((e: string) => {
        let arr: any = []
        setText(e)
        products.forEach((d: any) => {
            if (e.length > 1) {
                if (d.name?.includes(e)) {
                    arr.push(d)
                } else if (d.category?.includes(e.toLowerCase())) {
                    arr.push(d)
                }
            }
        })
        setSearchList(arr)
    }, [products])
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaler(18),
        elevation: 15
    },
    input: {
        paddingVertical: scaler(15),
        paddingHorizontal: scaler(10),
        fontSize: scaler(15),
        color: colors.colorBlackText
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