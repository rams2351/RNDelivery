import { colors, Images } from 'assets'
import React from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'
import { scaler } from 'utils/Scaler'

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <Image source={Images.ic_search} style={styles.image} />
            <TextInput style={styles.input} placeholder="Search" />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        marginVertical: scaler(25),
        backgroundColor: 'rgba(239, 238, 238, 1)',
        borderRadius: scaler(25),
        marginHorizontal: scaler(20),
        // borderWidth: scaler(1),
        // borderColor: colors.colorGreyInactive
        shadowColor: colors.colorGreyInactive,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaler(18),
    },
    input: {
        paddingVertical: scaler(15),
        paddingHorizontal: scaler(10),
        fontSize: scaler(15)
    },
    image: {
        height: scaler(25),
        width: scaler(25)
    }
})