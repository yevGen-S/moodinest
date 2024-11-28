import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Lesson, { LessonProps } from '@/components/Lesson/Lesson';
import { supabase } from '@/supabase';
import { Text, View } from 'react-native';
import HorizontalDivider from '@/components/HorizontalDivider/HorizontalDivider';
import CustomButton from '@/components/CustomButton/CustomButton';
import Rate from '@/components/Rate/Rate';
import { Session } from '@supabase/supabase-js';

async function getMeditationById(id: string) {
    const { data, error } = await supabase
        .from('Lessons')
        .select('*')
        .eq('id', id);
    return { data, error };
}

async function isLessonWatchLater(userID: string, lessonID: number) {
    const { data, error } = await supabase
        .from('WatchLater')
        .select('*')
        .eq('userID', userID)
        .eq('lessonID', lessonID)

    if (error) {
            console.error('Error checking favorite lesson:', error);
        return false;
    }

    return data && data.length > 0;
}

const MeditationCard = () => {
    const { id } = useLocalSearchParams()  as { id: string };
    const [data, setData] = useState<LessonProps | null>(null);
    const [isPressLater, setIsPressLater] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        const getData = async () => {
            const { data } = await getMeditationById(id as string);
            setData(data?.[0] as LessonProps);
        };
        getData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (session) {
                    const watchedlater = (await isLessonWatchLater(
                        session?.user.id,
                        Number(id),
                    ));
                    setIsPressLater(watchedlater);
                }
            } catch (e) {
                console.log(e);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [session])

    const insertWatchLater = async () => {
        const { data, error } = await supabase
            .from('WatchLater')
            .insert([
                {
                    userID: session?.user.id,
                    lessonID: Number(id),
                },
            ])

        if (error) {
            console.error('Error inserting lesson for watching later:', error);
        } else {
            console.log('Inserted lesson for watching later:', data);
        }
    };

    const handleWatchLater = () => {
        setIsPressLater(true);
        insertWatchLater();
    };

    return (
        <View style={{ alignItems: 'center' }}>
            <Text
                style={{
                    fontFamily: 'Work-Sans',
                    fontSize: 24,
                    width: '80%',
                    flexWrap: 'wrap',
                    textAlign: 'center',
                    marginBottom: 20,
                    marginTop: 40,
                }}
            >
                {data?.name}
            </Text>
            {data && <Lesson {...data} />}
            <HorizontalDivider />
            {isPressLater 
                ? ( <Text
                        style={{
                            fontFamily: 'Work-Sans',
                            fontSize: 20,
                            width: '80%',
                            flexWrap: 'wrap',
                            textAlign: 'center',
                            marginBottom: 40,
                        }}
                    >
                        Вы можете вернуться к видео у себя в профиле!
                    </Text>)
                : ( <View
                        style={{
                            marginBottom: 40,
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <CustomButton showText="Смотреть позже" onPress={() => handleWatchLater()}/>
                    </View>
                )
            }
            <Rate />
            <Text style={{ fontFamily: 'Work-Sans', color: '#AFB1B6' }}>
                Оцените видео
            </Text>
        </View>
    );
};

export default MeditationCard;
