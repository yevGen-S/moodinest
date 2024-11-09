import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

const LogoWithText = () => {
    return (
        <View style={styles.logoView}>
            <Image
                source={icons.logo}
                style={styles.logo}
            />
            <Text style={styles.title}>MoodiNest</Text>
        </View>
    );
};

export default LogoWithText;

const styles = StyleSheet.create({
    logoView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
    },
    logo: {
        width: 36,
        height: 36,
        resizeMode: 'cover',
        borderRadius: 100,
    },
    title: {
        fontFamily: 'Work-Sans',
        flexDirection: 'row',
        fontSize: 36,
    },
});
