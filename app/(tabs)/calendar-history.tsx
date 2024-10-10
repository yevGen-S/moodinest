import { Text } from 'react-native';
import React from 'react';
import { generalStyles } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarHistory = () => {
    return (
        <SafeAreaView style={generalStyles.container}>
            <Text>CalendarHistory</Text>
        </SafeAreaView>
    );
};

export default CalendarHistory;
