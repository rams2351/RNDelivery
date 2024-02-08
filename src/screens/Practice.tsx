import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Practice = () => {
    const renderView = (skeletonEnabled: boolean) => {
        return (
            <SafeAreaView edges={['top', 'bottom']}>
                <SkeletonPlaceholder borderRadius={4} enabled={skeletonEnabled}>
                    <Text style={styles.title}>Lorem ipsum</Text>
                </SkeletonPlaceholder>
                <View style={styles.container}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.subtitle} numberOfLines={2}>
                            Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

    return (
        <View>
            {renderView(false)}
            {renderView(true)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    image: {
        width: 65,
        height: 65,
    },
    titleContainer: {
        marginLeft: 16,
        flex: 1,
    },
    title: {
        fontSize: 20,
        lineHeight: 22,
    },
    subtitle: {
        fontSize: 14,
        marginTop: 8,
    },
});

export default Practice;