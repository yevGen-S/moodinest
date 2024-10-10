import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generalStyles } from '@/constants/theme';

const Main = () => {
    return (
        <SafeAreaView style={generalStyles.container}>
            <Text>Main</Text>
        </SafeAreaView>
    );
};

export default Main;
