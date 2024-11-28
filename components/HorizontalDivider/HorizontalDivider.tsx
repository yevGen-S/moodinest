import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';

type HorizontalDividerProps = {
    style?: ViewStyle;
};

const HorizontalDivider = ({ style }: HorizontalDividerProps) => {
    return <View style={[styles.divider, style]} />;
};

export default HorizontalDivider;

const styles = StyleSheet.create({
    divider: {
        backgroundColor: '#EFEFF0',
        height: 1,
        width: '100%',
    },
});
