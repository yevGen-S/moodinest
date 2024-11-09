import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Form from '@/components/Form/Form';
import LogoWithText from '@/components/LogoWithText/LogoWithText';
import HorizontalDivider from '@/components/HorizontalDivider/HorizontalDivider';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';

export default function SignUp() {
    return (
        <SafeAreaView style={styles.container}>
            <LogoWithText />
            <HorizontalDivider />
            <Image
                source={images.signUp}
                style={{ height: 317, width: 317 }}
            />

            <Form auth={'SignUp'} />

            <TouchableOpacity
                onPress={() => router.navigate('../(auth)/signIn')}
            >
                <Text
                    style={{
                        fontFamily: 'Work-Sans',
                        color: '#AFB1B6',
                        textAlign: 'center',
                    }}
                >
                    Уже есть аккаунт? {'\n'} Войти
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
