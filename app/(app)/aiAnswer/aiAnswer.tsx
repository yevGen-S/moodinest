import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';

const AiAnswer = () => {
    const { test, response } = useLocalSearchParams();
    const resObj = JSON.parse(test as string);
    return (
        <View style={{ alignItems: 'center', padding: 12, gap: 10 }}>
            <ScrollView style={styles.textContainer}>
                {resObj.map((q: Record<string, Object>) => {
                    const [question, answer] = Object.entries(q)[0];
                    return (
                        <View key={question} style={{ paddingBottom: 5 }}>
                            <Text>{question}</Text>
                            <Text>{JSON.stringify(answer)}</Text>
                        </View>
                    );
                })}
                <Text style={{ marginVertical: 30 }}>{response}</Text>
            </ScrollView>
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
        maxHeight: '80%',
        borderRadius: 24,
        borderColor: '#000000',
        borderWidth: 1,
    },
});
