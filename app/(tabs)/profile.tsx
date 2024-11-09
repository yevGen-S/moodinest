import { Alert, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generalStyles } from '@/constants/theme';
import CustomButton from '@/components/CustomButton/CustomButton';
import { supabase } from '@/supabase';
import { router } from 'expo-router';
import { Session } from '@supabase/supabase-js';

const Profile = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) Alert.alert(error.message);
        router.navigate('/(auth)/signIn');
    };
    return (
        <SafeAreaView
            style={[generalStyles.container, { alignItems: 'center', gap: 20 }]}
        >
            <Text>Профиль: {session?.user?.email}</Text>
            <CustomButton
                showText="Выйти"
                onPress={signOut}
            />
        </SafeAreaView>
    );
};

export default Profile;
