import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import HorizontalDivider from '../HorizontalDivider/HorizontalDivider';
import { generalStyles } from '@/constants/theme';
import images from '@/constants/images';
import { MoodContext } from '@/context/MoodContext';

const MoodPicker = () => {
    const { mood, isToday } = useContext(MoodContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Как ваше настроение?</Text>
            <HorizontalDivider />
            <View style={styles.picker}>
                {/* TODO: change images and add handler */}
                <TouchableOpacity>
                    <Image
                        source={images.cryingColor}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={images.sadFaceColor}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={images.neutralColor}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={images.smileColor}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={images.happyColor}
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
        marginBottom: 5,
    },
    title: {
        ...generalStyles.font,
        marginBottom: 7,
        marginLeft: 20,
    },
    picker: {
        width: '90%',
        gap: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    pickerImage: {
        width: 45,
        height: 45,
        objectFit: 'contain',
    },
});
