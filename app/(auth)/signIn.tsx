import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Form from '@/components/Form/Form';
import LogoWithText from '@/components/LogoWithText/LogoWithText';
import HorizontalDivider from '@/components/HorizontalDivider/HorizontalDivider';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';

export default function SignIn() {
    const [isImageVisible, setIsImageVisible] = useState(true);
    return (
        <SafeAreaView style={styles.container}>
            <LogoWithText />
            <HorizontalDivider />
            {isImageVisible && (
                <Image
                    source={images.signIn}
                    style={{ height: 317, width: 317 }}
                />
            )}

            <Form auth={'SignIn'} setIsImageVisible={setIsImageVisible} />

            <TouchableOpacity
                onPress={() => router.navigate('../(auth)/signUp')}
            >
                <Text
                    style={{
                        fontFamily: 'Work-Sans',
                        color: '#AFB1B6',
                        textAlign: 'center',
                    }}
                >
                    Нет аккаунта? {'\n'} Зарегистрироваться
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
