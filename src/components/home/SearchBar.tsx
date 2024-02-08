import { colors } from 'assets/Colors'
import { Images } from 'assets/image'
import React, { useCallback, useImperativeHandle } from 'react'
import { GestureResponderEvent, Image, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { DashboardScreens } from 'utils/Constant'
import { NavigationService } from 'utils/NavigationService'
import { scaler } from 'utils/Scaler'
import Card from '../Card'
import Text from '../Text'

export interface ISearchBar {
    onPressCard: (e?: GestureResponderEvent) => void
}

const SearchBar = React.forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const onPressHandler = useCallback(() => {
        NavigationService.push(DashboardScreens.SEARCH_SCREEN)
    }, [])


    useImperativeHandle(ref, () => {
        return {
            onPressCard: onPressHandler
        }
    }, [onPressHandler])

    return (
        <Card style={styles.cardContainer} onPressCard={onPressHandler}>
            <View style={styles.container}>
                <Image source={Images.ic_search} style={styles.image} />
                <Text style={styles.text}>Search</Text>
            </View>
        </Card>
    )
})

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