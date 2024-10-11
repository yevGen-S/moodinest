import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import HorizontalDivider from '../HorizontalDivider/HorizontalDivider';
import { generalStyles } from '@/constants/theme';
import images from '@/constants/images';

const MoodPicker = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Как ваше настроение?</Text>
            <HorizontalDivider />
            <View style={styles.picker}>
                {/* TODO: change images and add handler */}
                <TouchableOpacity>
                    <Image
                        source={images.meditation}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={images.meditation}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={images.meditation}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={images.meditation}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={images.meditation}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MoodPicker;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-start',
    },
    title: {
        ...generalStyles.font,
        fontSize: 16,
        marginBottom: 15,
        marginLeft: 15,
    },
    picker: {
        width: '90%',
        gap: 10,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    pickerImage: {
        width: 64,
        height: 64,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: '#AFB1B6',
    },
});
