import { colors } from 'assets';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scaler } from 'utils';

interface CategoryTabProps {
    tabList: any[];
    onChangeTab: (e: any) => void;
    activeTab: string;
}

const CategoryTab: React.FC<CategoryTabProps> = (props) => {
    const { tabList, onChangeTab, activeTab } = props;

    return (
        <ScrollView
            horizontal
            contentContainerStyle={styles.scrollArea}
            style={{ maxHeight: scaler(50), marginVertical: scaler(15), }}
            showsHorizontalScrollIndicator={false}
        >
            {tabList?.map((d, i) => (
                <TouchableOpacity style={styles.container} key={i} onPress={() => onChangeTab(d)}>
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
        paddingLeft: scaler(20)

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