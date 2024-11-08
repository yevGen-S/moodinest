import { View, Image, Text, StyleSheet } from 'react-native';
import React from 'react';
import images from '@/constants/images';

const Loader = () => {
    return (
        <View style={styles.container}>
            <Image
                source={images.loading}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>MoodiNest</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    image: {
        width: 368,
        height: 368,
    },
    title: {
        fontFamily: 'Work-Sans',
        fontSize: 50,
    },
});

export default Loader;
