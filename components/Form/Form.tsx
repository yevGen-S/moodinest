import { Alert, LayoutAnimation, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Input } from '@rneui/themed';
import CustomButton from '../CustomButton/CustomButton';
import { router } from 'expo-router';
import { supabase } from '@/supabase';

type authProps = {
    email: string;
    password: string;
};

export const signIn = async ({ email, password }: authProps) => {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        Alert.alert(error.message);
        return;
    }
    router.navigate('/main');
};

export const signUp = async ({ email, password }: authProps) => {
    const {
        data: { session },
        error,
    } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        Alert.alert(error.message);
        return;
    }
    if (!session) {
        Alert.alert('Проверьте почтовый ящик!');
        return;
    }
    router.navigate('../(auth)/signIn');
};

const Form = ({
    auth,
    setIsImageVisible,
}: {
    auth: 'SignIn' | 'SignUp';
    setIsImageVisible: (val: boolean) => void;
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{ width: '80%', alignItems: 'center' }}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="E-mail / Логин"
                    autoCapitalize={'none'}
                    onFocus={() => {
                        LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut
                        );
                        setIsImageVisible(false);
                    }}
                    onBlur={() => {
                        LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut
                        );
                        setIsImageVisible(true);
                    }}
                />
            </View>
            <View style={[styles.verticallySpaced]}>
                <Input
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Пароль"
                    autoCapitalize={'none'}
                    onFocus={() => {
                        LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut
                        );
                        setIsImageVisible(false);
                    }}
                    onBlur={() => {
                        LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut
                        );
                        setIsImageVisible(true);
                    }}
                />
            </View>
            {auth === 'SignIn' && (
                <CustomButton
                    showText="Войти"
                    onPress={() => {
                        signIn({ email, password });
                        router.navigate('/main');
                    }}
                    style={{ marginBottom: 10 }}
                />
            )}
            {auth === 'SignUp' && (
                <CustomButton
                    showText="Создать аккаунт"
                    onPress={() => {
                        signUp({ email, password });
                    }}
                    style={{ marginBottom: 10 }}
                />
            )}
        </View>
    );
};

export default Form;

const styles = StyleSheet.create({
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
});
