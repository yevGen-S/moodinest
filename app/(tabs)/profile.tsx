import { Alert, Image, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generalStyles } from '@/constants/theme';
import CustomButton from '@/components/CustomButton/CustomButton';
import { supabase } from '@/supabase';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import HorizontalDivider from '@/components/HorizontalDivider/HorizontalDivider';
import HorizontalNamedLessonsList from '@/components/HorizontalNamedLessonsList/HorizontalNamedLessonsList';
import { useIsFocused } from '@react-navigation/native';
import { Session } from '@supabase/supabase-js';

const fetchFavouriteLessons = async (userId: string) => {
    const { data, error } = await supabase
        .from('FavoriteLessons')
        .select('*, Lessons(id, name, description, duration, text, videoURL)')
        .eq('userID', userId);

    return { data, error };
};

const fetchWatchedLaterLessons = async (userId: string) => {
    const { data, error } = await supabase
        .from('WatchLater')
        .select('*, Lessons(id, name, description, duration, text, videoURL)')
        .eq('userID', userId);

    return { data, error };
};

const Profile = () => {
    const [session, setSession] = useState<Session | null>(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(({ data: { session } }) => {
                setSession(session);
                return session;
            })
            .then((session) => {
                if (session) {
                    fetchFavouriteLessons(session.user.id).then(console.log);
                    fetchWatchedLaterLessons(session.user.id).then(console.log);
                }
            });
    }, [isFocused]);

    const signOut = async () => {
        Alert.alert('Подтвердите выход', 'Вы действительно хотите выйти?', [
            {
                text: 'Остаться',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Ок',
                onPress: async () => {
                    const { error } = await supabase.auth.signOut();
                    if (error) Alert.alert(error.message);
                    router.navigate('/(auth)/signIn');
                },
            },
        ]);
    };

    return (
        <SafeAreaView
            style={[
                generalStyles.container,
                {
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: 20,
                },
            ]}
        >
            <Image
                source={icons.avatar}
                resizeMode="contain"
                style={{ width: 56, height: 56, marginBottom: 20 }}
            />
            <Text style={{ ...generalStyles.font, marginBottom: 20 }}>
                {session?.user?.email}
            </Text>
            <CustomButton
                showText="Выйти"
                onPress={signOut}
                style={{ width: '60%', marginBottom: 20 }}
            />
            <HorizontalDivider />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 20,
                }}
            >
                <HorizontalNamedLessonsList name="Избранное" />
                <View style={{ height: 20 }} />
                <HorizontalNamedLessonsList name="Смотреть позже" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
