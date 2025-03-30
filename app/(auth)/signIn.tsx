import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Form from '@/components/Form/Form';
import LogoWithText from '@/components/LogoWithText/LogoWithText';
import HorizontalDivider from '@/components/HorizontalDivider/HorizontalDivider';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import { Session } from '@supabase/supabase-js';

export default function SignIn({ session }: { session: Session | null }) {
    const [isImageVisible, setIsImageVisible] = useState(true);

    useEffect(() => {
        if (session?.user.id) {
            router.navigate({
                pathname: '/(tabs)/main',
                params: { userId: session?.user.id },
            });
        }
    }, [session]);

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

            <Form
                auth={'SignIn'}
                setIsImageVisible={setIsImageVisible}
            />

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
