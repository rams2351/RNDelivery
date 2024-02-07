import { Images } from 'assets/image'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { colors } from 'src/assets/Colors'
import Card from 'src/components/Card'
import Popup from 'src/components/Popup'
import Text from 'src/components/Text'
import { actions } from 'src/redux/slices/reducer'
import { AppState } from 'src/types/interface'
import { DashboardScreens } from 'src/utils/Constant'
import { scaler } from 'utils/Scaler'

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

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const navigationHandler = useCallback((route: string) => {
        if (route === 'logout') {
            setModalOpen(true)
        } else {
            navigation.push('BottomNavigation', { screen: route })
        }
    }, [])
    const logoutHandler = useCallback(() => {
        dispatch(actions.setUserData(null))
        dispatch(actions.setLogin(false))
    }, [])

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: scaler(15) }}>
                <Text style={[styles.textName, { marginVertical: scaler(10) }]}>Personal Detail</Text>
                <Card style={[{ marginBottom: scaler(10) }]}>
                    <View style={[styles.imageTextContainer, { borderBottomWidth: 1, borderColor: colors.colorGreyMore }]}>
                        <Image source={Images.ic_user1} style={styles.imageContainer} />
                        <View style={styles.textContainer}>
                            <Text style={styles.textName}>{user?.firstName + " " + user?.lastName}</Text>
                            <Text style={styles.textDesc}  >{user?.email} </Text>
                            <Text style={styles.textDesc}>{user?.countryCode + " " + user?.phone}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>Address:</Text>
                        {user?.address.map((d: any, i: number) => (<Text key={i} style={styles.textDesc}>{d.address}</Text>))}
                    </View>
                </Card>

                {OptionList.map((d, i) => (
                    <Card key={i} style={{ marginVertical: scaler(10) }} onPressCard={() => d.route.length ? navigationHandler(d.route) : null}>
                        <View style={[styles.imageTextContainer, styles.additional]}>
                            <Text style={styles.textName}>{d.name}</Text>
                            <Image source={Images.ic_left_icon} style={{ height: scaler(18), width: scaler(18) }} />
                        </View>
                    </Card>))}

                <Popup
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={'Logout'}
                    leftButtonText={'Cancel'}
                    rightButtonText="Logout"
                    leftButtonAction={() => setModalOpen(false)}
                    rightButtonAction={logoutHandler}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Are you want to Logout from the Food App?</Text>
                    </View>
                </Popup>
            </View>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.colorBackground,
    },
    imageContainer: {
        height: scaler(85),
        width: scaler(85),
        borderRadius: scaler(20),
        marginBottom: scaler(8)
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
    },
    modalContainer: {
        padding: scaler(15),
        display: 'flex',
        flexShrink: 1
    },
    modalText: {
        fontWeight: '600',
        color: colors.colorGreyInactive
    }
})