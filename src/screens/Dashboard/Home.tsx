import { colors, Images } from 'assets'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ItemDisplayCard from 'src/components/DisplayCard'
import CategoryTab from 'src/components/home/CategoryTab'
import SearchBar from 'src/components/home/SearchBar'
import { scaler } from 'utils/Scaler'

const Home = () => {
    const [activeTab, setActiveTab] = useState<string>('Foods')
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.colorBackground }} edges={['top']}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.logoTextContainer}>
                    <View style={styles.imageContainer}><Image source={Images.logo} style={styles.image} /></View>
                    <View>
                        <Text style={styles.deliciousText}>Delicious </Text>
                        <Text style={styles.deliciousText}>food for you</Text>
                    </View>
                </View>

                <SearchBar />

                <CategoryTab
                    tabList={['Foods', 'Drinks', 'Snacks', 'Sauces', 'Burgers', 'Pizza']}
                    onChangeTab={(e) => setActiveTab(e)}
                    activeTab={activeTab}
                />

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{}}
                    contentContainerStyle={{ paddingHorizontal: 30 }}
                >
                    <ItemDisplayCard
                        img={Images.ic_food_1}
                        title={'hello this is food item'}
                        price={'2100'}
                        onPressItem={(e) => console.log('firstly pressed item', e)}
                    />
                    <ItemDisplayCard
                        img={Images.ic_food_2}
                        title={'hello this is food item'}
                        price={'2100'}
                        onPressItem={(e) => console.log('firstly pressed item', e)}
                    />
                    <ItemDisplayCard
                        img={Images.ic_food_3}
                        title={'hello this is food item'}
                        price={'2100'}
                        onPressItem={(e) => console.log('firstly pressed item', e)}
                    />
                    <ItemDisplayCard
                        img={Images.ic_food_4}
                        title={'hello this is food item'}
                        price={'2100'}
                        onPressItem={(e) => console.log('firstly pressed item', e)}
                    />
                </ScrollView>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingLeft: scaler(35),
        paddingTop: scaler(50)
    },
    deliciousText: {
        fontSize: scaler(35),
        fontWeight: '700',
        paddingRight: scaler(80),
        color: colors.colorPrimary,
    },
    image: {
        height: scaler(50),
        width: scaler(50),
        marginLeft: scaler(8)
    },
    imageContainer: {
        backgroundColor: colors.colorWhite,
        height: scaler(60),
        width: scaler(60),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaler(10),
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.colorFocus,
        overflow: 'hidden',
        marginTop: scaler(5)
    },
    logoTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: scaler(8),
        paddingHorizontal: scaler(20)
    }
})