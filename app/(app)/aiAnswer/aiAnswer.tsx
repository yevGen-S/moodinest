import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';

const aiAnswer = () => {
    const { response } = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <Text>{response}</Text>
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

export default aiAnswer;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: '100%',
        height: '100%',
        borderRadius: 24,
        borderColor: '#000000',
        borderWidth: 1,
    },
});
