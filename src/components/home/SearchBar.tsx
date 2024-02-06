import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { actions } from 'src/redux/slices/reducer'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'
import Card from '../Card'
import Text from '../Text'

const SearchBar = () => {
    const dispatch = useDispatch()

    const onPressHandler = useCallback(() => {
        dispatch(actions.getAllProducts())
        NavigationService.push(DashboardScreens.SEARCH_SCREEN)
    }, [])
    return (
        <Card style={styles.cardContainer} onPressCard={onPressHandler}>
            <View style={styles.container}>
                <Image source={Images.ic_search} style={styles.image} />
                <Text style={styles.text}>Search</Text>
            </View>
        </Card>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        paddingHorizontal: scaler(10),
        fontSize: scaler(15),
        fontWeight: '400',
        color: colors.colorGreyText
    },
    cardContainer: {
        margin: scaler(18),
        marginHorizontal: scaler(25),
        padding: scaler(3),
        borderRadius: scaler(30)
    },
    image: {
        height: scaler(22),
        width: scaler(22)
    },
})