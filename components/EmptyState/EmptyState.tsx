import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { generalStyles } from '@/constants/theme';

type EmptyStateProps = {
    title: string;
    subtitle?: string;
};

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
    return (
        <View>
            <Text style={generalStyles.font}>{title}</Text>
            {subtitle && <Text>{subtitle}</Text>}
        </View>
    );
};

export default EmptyState;
