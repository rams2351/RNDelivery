import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Practice = () => {
    const [viewSize, setViewSize] = useState<any>('100%');

    const resizeView = () => {
        setViewSize(viewSize === '100%' ? '50%' : '100%');
    };

    return (
        <View style={{ flex: 1, marginTop: 50 }}>
            <View style={{ backgroundColor: '#E6EEF7', width: viewSize, height: 100, padding: 25, margin: 5, flexDirection: 'column', flexWrap: 'wrap' }}>
                <Text style={{ margin: 3 }}>
                    Educative is a ...
                </Text>
                <Text style={{ margin: 3 }}>
                    Educative is a ...
                </Text>
                <Text style={{ margin: 3 }}>
                    Educative is a ...
                </Text>
            </View>
            <View style={{ backgroundColor: '#E6EEF7', width: viewSize, padding: 25, margin: 5, flexDirection: 'row' }}>
                <Text style={{ flexShrink: 1, margin: 3 }}>
                    Educative is a hands-on learning platform for software developers of all levels.
                </Text>
                <Text style={{ flexShrink: 1, margin: 3 }}>
                    Educative is a hands-on learning platform for software developers of all levels.
                </Text>
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: 'gray',
                    padding: 10,
                    marginTop: 10,
                    alignItems: 'center',
                }}
                onPress={resizeView}
            >
                <Text style={{ color: 'white' }}>Resize Container</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Practice;