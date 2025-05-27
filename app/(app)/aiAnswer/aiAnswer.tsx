import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';

const AiAnswer = () => {
    const { response } = useLocalSearchParams();
    return (
        <View style={{ alignItems: 'center', padding: 12, gap: 10 }}>
            <View style={styles.textContainer}>
                <Text>{response}</Text>
            </View>
            <CustomButton
                showText={'Хочу!'}
                onPress={() =>
                    router.navigate({
                        pathname: '../../(tabs)/lessons',
                    })
                }
            />
            <CustomButton
                showText={'Спасибо, не сейчас'}
                style={{ backgroundColor: '#D9D9D9' }}
                onPress={() =>
                    router.navigate({
                        pathname: '../../(tabs)/main',
                    })
                }
            />
        </View>
    );
};

export default AiAnswer;

const styles = StyleSheet.create({
    textContainer: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: '100%',
        minHeight: '50%',
        borderRadius: 24,
        borderColor: '#000000',
        borderWidth: 1,
    },
});
