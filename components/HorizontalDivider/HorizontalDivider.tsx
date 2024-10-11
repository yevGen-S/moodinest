import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HorizontalDivider = () => {
    return <View style={styles.divider} />;
};

export default HorizontalDivider;

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: '#EFEFF0',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
    },
});
