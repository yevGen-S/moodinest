import { Text, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generalStyles } from '@/constants/theme';
import LastWeekCalendar from '@/components/LastWeekCalendar/LastWeekCalendar';
import images from '@/constants/images';
import MoodPicker from '@/components/MoodPicker/MoodPicker';
import CustomButton from '@/components/CustomButton/CustomButton';
import { MoodProvider } from '@/context/MoodContext';

const Main = () => {
    return (
        <MoodProvider>
            <SafeAreaView
                style={{
                    ...generalStyles.container,
                    alignItems: 'center',
                    gap: 25,
                }}
            >
                <Text style={styles.logoText}>MoodiNest</Text>
                <LastWeekCalendar />
                <Image
                    source={images.meditation}
                    style={styles.image}
                    resizeMode="cover"
                />
                <MoodPicker />
                <CustomButton showText="Подобрать медитацию" />
            </SafeAreaView>
        </MoodProvider>
    );
};

export default Main;

const styles = StyleSheet.create({
    logoText: {
        ...generalStyles.font,
        fontSize: 36,
    },
    image: {
        width: 260,
        height: 260,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: '#AFB1B6',
    },
});
