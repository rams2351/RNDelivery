import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { testing } from "src/api";

const Profile = () => {


    useEffect(() => {
        testing()
    }, [])
    return (
        <View>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile