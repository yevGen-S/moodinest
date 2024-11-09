import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Input } from '@rneui/themed';
import CustomButton from '../CustomButton/CustomButton';
import { router } from 'expo-router';

const Form = ({ auth }: { auth: 'SignIn' | 'SignUp' }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{ width: '80%' }}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="E-mail / Логин"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced]}>
                <Input
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Пароль"
                    autoCapitalize={'none'}
                />
            </View>
            {auth === 'SignIn' && (
                <CustomButton
                    showText="Войти"
                    onPress={() => router.navigate('/main')}
                    style={{ marginBottom: 10 }}
                />
            )}
            {auth === 'SignUp' && (
                <CustomButton
                    showText="Создать аккаунт"
                    onPress={() => router.navigate('/main')}
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
