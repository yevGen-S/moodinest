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
// import GigaChat from 'gigachat';
import { v4 as uuid } from 'uuid';

// const giga = new GigaChat({
//     credentials:
//         'MTJlZTdkNjUtYWNlNC00NGNjLTlmNzctNTFmOWZhZDUzY2IwOjQ2ZjZlMGRmLTk1YWItNGEyMy05NWU5LTVkYzI1OWJhNjY5ZQ==',
//     model: 'GigaChat',
//     scope: 'GIGACHAT_API_PERS',
// });

const fetchData = async () => {
    const url = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
    const requestId = uuid();
    const authorizationKey =
        'MTJlZTdkNjUtYWNlNC00NGNjLTlmNzctNTFmOWZhZDUzY2IwOjQ2ZjZlMGRmLTk1YWItNGEyMy05NWU5LTVkYzI1OWJhNjY5ZQ==';

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        RqUID: requestId,
        Authorization: `Basic ${authorizationKey}`,
    };

    const body = new URLSearchParams({
        scope: 'GIGACHAT_API_PERS',
    }).toString();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
};

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
                const queryContent = questions.map((q, i) => ({
                    [q.text]: updated[i],
                }));
                // let response = await giga.chat({
                //     messages: [
                //         {
                //             role: 'user',
                //             content: `Поблагодари за прохождение опроса, предложи рекомендацию на сегодняшний день согласно пройденному опросу, дай совет для улучшения плохого состояния или поддержания хорошего исходя из опроса, Опрос: ${JSON.stringify(
                //                 updated
                //             )}`,
                //         },
                //     ],
                // });

                // console.log(response.choices[0]?.message.content);

                // await fetchData();

                // const res = await fetch(
                //     'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
                //     {
                //         headers: {
                //             'Content-Type': 'application/x-www-form-urlencoded',
                //             Accept: 'application/json',
                //             RqUID: '12ee7d65-ace4-44cc-9f77-51f9fad53cb0',
                //             Authorization:
                //                 'Basic MTJlZTdkNjUtYWNlNC00NGNjLTlmNzctNTFmOWZhZDUzY2IwOjQ2ZjZlMGRmLTk1YWItNGEyMy05NWU5LTVkYzI1OWJhNjY5ZQ==',
                //         },
                //         method: 'POST',
                //         body: JSON.stringify({ scope: 'GIGACHAT_API_PERS' }),
                //     }
                // );

                // const token = await res.json();

                // console.log(token);

                router.navigate({
                    pathname: '../../aiAnswer/aiAnswer',
                    params: {
                        test: JSON.stringify(queryContent), //response.choices[0]?.message.content,
                        response: `Спасибо большое за участие в опросе!

Сегодняшняя рекомендация основывается на ваших предпочтениях и потребностях. Вы отметили занятие спортом как практику, которую хотите попробовать для улучшения настроения. Отличная идея — физическая активность действительно помогает поднять настроение и зарядиться энергией.

Совет: Если чувствуете себя неважно, попробуйте начать с небольшой прогулки на свежем воздухе или легкой разминки дома. Это поможет снять стресс и повысить общий тонус организма. А если у вас хорошее состояние, поддерживайте его регулярностью занятий и слушайте свое тело, увеличивая нагрузку постепенно.

Помните, забота о себе важна каждый день.

Хотите попробовать медитацию сейчас?`,
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
