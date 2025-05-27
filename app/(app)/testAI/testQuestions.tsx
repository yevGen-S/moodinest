import 'react-native-get-random-values';

import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    Image,
    Keyboard,
} from 'react-native';
import CustomButton from '@/components/CustomButton/CustomButton';
import questions from '@/constants/questions';
import { generalStyles } from '@/constants/theme';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import GigaChat from 'gigachat';

const giga = new GigaChat({
    credentials:
        'MTJlZTdkNjUtYWNlNC00NGNjLTlmNzctNTFmOWZhZDUzY2IwOmUyNWQ1YWY2LWNlMjMtNGZhNy1hMmRlLWYwZDZmZGUyOWM1NQ==',
    model: 'GigaChat',
    scope: 'GIGACHAT_API_PERS',
});

const QuestionScreen = () => {
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [answers, setAnswers] = useState(
        Array(questions.length).fill({ selected: null, comment: '' })
    );

    const goToStep = (index: number) => {
        Keyboard.dismiss();

        setStep(index);
        setSelected(answers[index].selected);
        setComment(answers[index].comment);
    };

    const handleOptionSelect = (opt: string) => {
        setSelected(opt);
        const updated = [...answers];
        updated[step] = { ...updated[step], selected: opt };
        setAnswers(updated);
    };

    const handleCommentChange = (text: string) => {
        setComment(text);
        const updated = [...answers];
        updated[step] = { ...updated[step], comment: text };
        setAnswers(updated);
    };

    const handleNext = async () => {
        const updated = [...answers];
        updated[step] = { selected, comment };
        setAnswers(updated);

        if (step < questions.length - 1) {
            goToStep(step + 1);
        } else {
            console.log('Ответы:', updated);

            try {
                let response = await giga.chat({
                    messages: [
                        {
                            role: 'user',
                            content: `Поблагодари за прохождение опроса, предложи рекомендацию на сегодняшний день согласно пройденному опросу, дай совет для улучшения плохого состояния или поддержания хорошего исходя из опроса, Опрос: ${JSON.stringify(
                                updated
                            )}`,
                        },
                    ],
                });

                console.log(response.choices[0]?.message.content);

                router.navigate({
                    pathname: '../../aiAnswer/aiAnswer',
                    params: {
                        response: 'response.choices[0]?.message.content',
                    },
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const current = questions[step];

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.outBtn}
                    onPress={() =>
                        router.navigate({
                            pathname: '../../(tabs)/main',
                        })
                    }
                >
                    <Image
                        source={icons.arrowToLeft}
                        style={styles.outIcon}
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                {questions.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.points,
                            index === step && styles.current,
                        ]}
                        onPress={() => goToStep(index)}
                    />
                ))}
            </View>
            <View style={styles.content}>
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.question}>{`${step + 1}. ${
                        current.text
                    }`}</Text>

                    {current.options.map((opt) => (
                        <TouchableOpacity
                            key={opt}
                            style={[
                                styles.option,
                                selected === opt && styles.selected,
                            ]}
                            onPress={() => handleOptionSelect(opt)}
                        >
                            <Text>{opt}</Text>
                        </TouchableOpacity>
                    ))}

                    <TextInput
                        placeholder="Пожалуйста, расскажите подробнее"
                        value={comment}
                        onChangeText={handleCommentChange}
                        style={styles.input}
                        multiline
                    />
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <CustomButton
                    showText={
                        step < questions.length - 1 ? 'Продолжить' : 'Завершить'
                    }
                    onPress={handleNext}
                />
            </View>
        </View>
    );
};

export default QuestionScreen;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginHorizontal: 60,
        marginVertical: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flexWrap: 'wrap',
    },
    outBtn: {
        width: 48,
        height: 40,
        position: 'absolute',
        top: -3,
        left: -38,
    },
    outIcon: {
        width: 24,
        height: 20,
    },
    points: {
        width: 14,
        height: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: '#D9D9D9',
    },
    current: {
        borderColor: '#000',
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    scroll: {
        paddingBottom: 100,
    },
    question: {
        ...generalStyles.font,
        textAlign: 'center',
        marginBottom: 24,
    },
    option: {
        ...generalStyles.font,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#D9D9D9',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 16,
        padding: 12,
        minHeight: 80,
        textAlignVertical: 'top',
        marginTop: 12,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
