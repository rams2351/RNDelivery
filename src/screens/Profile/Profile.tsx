import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { actions } from 'src/redux/slices/reducer';

const Profile = () => {
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])
    return (
        <SafeAreaView>

            <View>
                <TouchableOpacity onPress={() => dispatch(actions.validateUser(`(phone,eq,9001547465)`))}>

                    <Text>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile