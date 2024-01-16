import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { actions } from 'src/redux/slices/reducer'

const Favorite = () => {
    const dispatch = useDispatch()
    return (
        <SafeAreaView>

            <TouchableOpacity onPress={() => {
                dispatch(actions.setUserData(null))
                dispatch(actions.setLogin(false))
            }}>
                <Text>Favorite</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Favorite