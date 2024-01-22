import { colors } from 'assets/alllll';
import React, { useRef } from 'react';
import { Dimensions, FlatList, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scaler } from 'utils/all';
import Text from '../Text';

interface CategoryTabProps {
    tabList: any[];
    onChangeTab: (e: any) => void;
    activeTab: string;
}

const CategoryTab: React.FC<CategoryTabProps> = (props) => {
    const { tabList, onChangeTab, activeTab } = props;
    const scrollViewRef = useRef<FlatList>(null)
    if (activeTab === 'All') scrollViewRef?.current?.scrollToIndex({ animated: true, index: 0 })
    const scrollToValidPoint = (i: number, e: GestureResponderEvent) => {
        const { pageX, locationX } = e.nativeEvent
        const width = Dimensions.get('screen').width
        // console.log("pageX", pageX)
        // console.log("locationX", locationX)
        const scrollX = i == 0 ? 0 : pageX + 50
        if (scrollViewRef.current) {
            let index = (i || 1) - 1
            // if(pageX>)
            scrollViewRef.current.scrollToIndex({ index: (i || 1) - 1, animated: true })
        }
    }

    return (
        <FlatList
            data={tabList}
            horizontal
            contentContainerStyle={styles.scrollArea}
            style={{ maxHeight: scaler(50), marginVertical: scaler(15), }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i?.toString()}
            renderItem={({ item: d, index: i }) => {
                return <TouchableOpacity onLayout={e => {
                    // console.log("i", e.nativeEvent.layout.width)
                }} style={styles.container} key={i} onPress={(e) => {
                    scrollToValidPoint(i, e)
                    onChangeTab(d)
                }}>
                    <Text style={[styles.text, activeTab === d ? styles.activeText : {}]}>{d}</Text>
                    {activeTab === d ? <View style={styles.underline} /> : null}
                </TouchableOpacity>
            }}
            ref={scrollViewRef} />
    )
}

export default CategoryTab

const styles = StyleSheet.create({
    scrollArea: {
        height: scaler(45),
        paddingHorizontal: scaler(20)

    },
    container: {
        marginHorizontal: scaler(10)
    },
    text: {
        marginHorizontal: 10,
        fontSize: scaler(17),
        color: colors.colorGreyMore,
        fontWeight: '500'
    },
    activeText: {
        fontWeight: '600',
        fontSize: scaler(18),
        color: colors.colorPrimary
    },
    underline: {
        borderBottomWidth: scaler(3),
        borderColor: colors.colorFocus,
        marginTop: scaler(1),
        borderRadius: 10
    }
})