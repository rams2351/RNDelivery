import { Images } from 'assets/alllll'
import React, { useCallback } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { colors } from 'src/assets/Colors'
import Card from 'src/components/Card'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'src/utils/Constant'
import { scaler } from 'utils/all'

const OptionList = [
    {
        name: 'Orders',
        route: DashboardScreens.ORDERS
    },
    {
        name: 'Pending Reviews',
        route: ''
    },
    {
        name: 'Help',
        route: ''
    },
    // {
    //     name: 'Faq',
    //     route: ''
    // },
    {
        name: 'Logout',
        route: 'logout'
    },

]

const Profile = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state: AppState) => ({
        user: state.user.user
    }), shallowEqual)

    const navigationHandler = useCallback((route: string) => {
        if (route === 'logout') {
            dispatch(actions.setUserData(null))
            dispatch(actions.setLogin(false))
        } else {
            navigation.navigate('BottomNavigation', { screen: route })
        }
    }, [])
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={{ padding: scaler(20) }}>
                <Text style={[styles.textName, { marginVertical: scaler(10) }]}>Personal Detail</Text>
                <Card cardStyle={styles.imageTextContainer}>
                    <Image source={Images.ic_user1} style={styles.imageContainer} />
                    <View style={styles.textContainer}>
                        <Text style={styles.textName}>{user?.firstName + " " + user?.lastName}</Text>
                        <Text style={styles.textDesc}  >{user?.email} </Text>
                        <Text style={styles.textDesc}>{"+" + user?.countryCode + " " + user?.phone}</Text>
                        <Text style={styles.textDesc}>1st floor,taj plaza, tdi sector 117,mohali punjab dafdsfadsfadfdfdfdf adfdfdf  adfadfdfdfd</Text>
                    </View>
                </Card>

                {OptionList.map((d, i) => (
                    <Card key={i} cardStyle={{}} onPressCard={() => d.route.length ? navigationHandler(d.route) : null}>
                        <View style={[styles.imageTextContainer, styles.additional]}>
                            <Text style={styles.textName}>{d.name}</Text>
                            <Image source={Images.ic_left_icon} style={{ height: scaler(18), width: scaler(18) }} />
                        </View>
                    </Card>))}
            </View>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.colorBackground,
        flex: 1
    },
    imageContainer: {
        height: scaler(100),
        width: scaler(100),
        borderRadius: scaler(20)
    },
    imageTextContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    textContainer: {
        marginTop: scaler(8),
        paddingLeft: scaler(10),
        flexShrink: 1,
        display: 'flex',
        // flexWrap: 'wrap',
    },
    textName: {
        fontSize: scaler(17),
        color: colors.colorBlackText,
        fontWeight: '600'
    },
    textDesc: {
        fontSize: scaler(13),
        color: colors.colorGreyInactive,
        marginVertical: 2
    },
    additional: {
        padding: 6,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})