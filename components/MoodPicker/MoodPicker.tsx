import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import HorizontalDivider from '../HorizontalDivider/HorizontalDivider';
import { generalStyles } from '@/constants/theme';
import images from '@/constants/images';

interface MoodPickerProps {
    mood: number;
    isToday: boolean;
    insertMoodData: (mood: number) => void;
    updateMoodData: (mood: number) => void;
    setChangedMood: (mood: number) => void;
}

const MoodPicker: React.FC<MoodPickerProps> = ({ mood, isToday, insertMoodData, updateMoodData, setChangedMood }) => {

    const handleMoodSelect = async (selectedMood: number) => {
        setChangedMood(selectedMood);
        try {
            if (!mood) {
                await insertMoodData(selectedMood);
            } else {
                await updateMoodData(selectedMood);
            }
        } catch (error) {
            console.error("Ошибка при обновлении настроения:", error);
        }
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Как ваше настроение?</Text>
            <HorizontalDivider />
            <View style={styles.picker}>
                <TouchableOpacity disabled={!isToday} onPress={() => handleMoodSelect(1)}>
                    <Image
                        source={mood === 1 || !mood && isToday ? images.cryingColor: images.crying}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isToday} onPress={() => handleMoodSelect(2)}>
                    <Image
                        source={mood === 2 || !mood && isToday ? images.sadFaceColor : images.sadFace}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isToday} onPress={() => handleMoodSelect(3)}>
                    <Image
                        source={mood === 3 || !mood && isToday ? images.neutralColor : images.neutral}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isToday} onPress={() => handleMoodSelect(4)}>
                    <Image
                        source={mood === 4 || !mood && isToday ? images.smileColor : images.smile}
                        resizeMode="cover"
                        style={styles.pickerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isToday} onPress={() => handleMoodSelect(5)}>
                    <Image
                        source={mood === 5 || !mood && isToday ? images.happyColor : images.happy}
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
        width: 47,
        height: 47,
        objectFit: 'contain',
    },
});
