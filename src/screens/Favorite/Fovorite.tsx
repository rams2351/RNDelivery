import { colors, Images } from 'assets/alllll'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Button'
import { actions } from 'src/redux/slices/reducer'
import { scaler } from 'utils/all'

const Favorite = () => {
    const dispatch = useDispatch()
    return (
        <View style={{ backgroundColor: colors.colorBackground, flex: 1 }}>
            <View style={styles.container}>

                <Image source={Images.heart} style={styles.image} />
                <Text style={styles.text}>No Favorites yet</Text>
                <Text numberOfLines={2} style={styles.textDescription}>Hit the orange button down below to add Favorite</Text>

            </View>
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