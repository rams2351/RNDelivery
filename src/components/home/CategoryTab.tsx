import { colors } from 'assets/alllll';
import React, { useRef } from 'react';
import { GestureResponderEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scaler } from 'utils/all';

interface CategoryTabProps {
    tabList: any[];
    onChangeTab: (e: any) => void;
    activeTab: string;
}

const CategoryTab: React.FC<CategoryTabProps> = (props) => {
    const { tabList, onChangeTab, activeTab } = props;
    const scrollViewRef = useRef<ScrollView>(null)

    const scrollToValidPoint = (i: number, e: GestureResponderEvent) => {
        const { pageX, locationX } = e.nativeEvent
        // console.log("pageX", pageX)
        // console.log("locationX", locationX)
        const scrollX = i == 0 ? 0 : pageX + 50
        if (scrollViewRef.current)
            scrollViewRef.current.scrollTo({ x: scrollX, y: 0, animated: true })
    }

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerStyle={styles.scrollArea}
            style={{ maxHeight: scaler(50), marginVertical: scaler(15), }}
            showsHorizontalScrollIndicator={false}
        >
            {tabList?.map((d, i) => (
                <TouchableOpacity onLayout={e => {
                    // console.log("i", e.nativeEvent.layout.width)
                }} style={styles.container} key={i} onPress={(e) => {
                    onChangeTab(d)
                }}>
                    <Text style={[styles.text, activeTab === d ? styles.activeText : {}]}>{d}</Text>
                    {activeTab === d ? <View style={styles.underline} /> : null}
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default CategoryTab

const styles = StyleSheet.create({
    scrollArea: {
        height: scaler(30),
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
        marginTop: scaler(5),
        borderRadius: 10
    }
})