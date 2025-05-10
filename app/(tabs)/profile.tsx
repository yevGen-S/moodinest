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
import { Weather } from '@/components/Weather/Weather';

const fetchFavouriteLessons = async (userId: string) => {
    const { data, error } = await supabase
        .from('FavoriteLessons')
        .select(
            'lessonID, userID, Lessons(id, name, description, duration, text)'
        )
        .eq('userID', userId);

    return { data: data?.map((item) => item.Lessons), error };
};

const fetchWatchLaterLessons = async (userId: string) => {
    const { data, error } = await supabase
        .from('WatchLater')
        .select(
            'lessonID, userID, Lessons(id, name, description, duration, text)'
        )
        .eq('userID', userId);

    return { data: data?.map((item) => item.Lessons), error };
};

const Profile = () => {
    const [session, setSession] = useState<Session | null>(null);
    const isFocused = useIsFocused();
    const [favouriteLessons, setFavouriteLessons] = useState<any[]>([]);
    const [watchLaterLessons, setWatchLaterLessons] = useState<any[]>([]);

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(({ data: { session } }) => {
                setSession(session);
                return session;
            })
            .then((session) => {
                if (session) {
                    fetchFavouriteLessons(session.user.id).then(({ data }) => {
                        console.log(data);
                        setFavouriteLessons(data ?? []);
                    });

                    fetchWatchLaterLessons(session.user.id).then(({ data }) => {
                        console.log(data);
                        setWatchLaterLessons(data ?? []);
                    });
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
                <Weather />
                <HorizontalNamedLessonsList
                    data={favouriteLessons}
                    name="Избранное"
                />
                <View style={{ height: 20 }} />
                <HorizontalNamedLessonsList
                    data={watchLaterLessons}
                    name="Смотреть позже"
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
