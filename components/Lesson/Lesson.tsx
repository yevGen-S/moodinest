import { ImageURISource, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { generalStyles } from '@/constants/theme';
import VideoCard from './VideoCard';
import { supabase } from '@/supabase';
import { Session } from '@supabase/supabase-js';

export type LessonProps = {
    videoURL: string;
    thubnail?: ImageURISource;
    name: string;
    description?: string;
    duration?: number;
    id: number;
};

async function isLessonFavorited(lessonID: number, userID: string) {
    const { data, error } = await supabase
        .from('FavoriteLessons')
        .select('*')
        .eq('lessonID', lessonID)
        .eq('userID', userID)

    if (error) {
            console.error('Error checking favorite lesson:', error);
        return false;
    }

    return data && data.length > 0;
}

const Lesson = ({
    videoURL,
    thubnail,
    name,
    description,
    duration,
    id,
}: LessonProps) => {
    const [play, setPlay] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
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

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    if (session) {
                        const favourited = (await isLessonFavorited(
                            id,
                            session?.user.id
                        ));
                        setIsFavourite(favourited);
                    }
                } catch (e) {
                    console.log(e);
                }
                setIsLoading(false);
            };

            fetchData();
        }, [session, isFavourite])
    );

    const insertFavoriteLesson = async () => {
        const { data, error } = await supabase
            .from('FavoriteLessons')
            .insert([
                {
                    userID: session?.user.id,
                    lessonID: id,
                },
            ])

        if (error) {
            console.error('Error inserting Favorite Lesson:', error);
        } else {
            console.log('Inserted Favorite Lesson:', data);
            setIsFavourite(true);
        }
    };

    const deleteFavoriteLesson = async () => {
        const { data, error } = await supabase
            .from('FavoriteLessons')
            .delete()
            .eq('lessonID', id)
            .eq('userID', session?.user.id);

        if (error) {
            console.error('Error deleting Favorite Lesson:', error);
        } else {
            console.log('Deleted Favorite Lesson:', data);
            setIsFavourite(false);
        }
    };

    return (
        <View style={styles.container}>
            <VideoCard
                videoURL={videoURL}
                thubnail={thubnail}
                play={play}
                onPress={() => setPlay(true)}
                setPlay={setPlay}
                duration={duration}
                isFavourite={isFavourite}
                insertFavoriteLesson={insertFavoriteLesson}
                deleteFavoriteLesson={deleteFavoriteLesson}
            />
            <View style={{ alignSelf: 'flex-start' }}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

export default Lesson;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        gap: 15,
        height: 278,
        borderWidth: 1,
        borderColor: '#EFEFF0',
        borderRadius: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    title: {
        ...generalStyles.font,
        fontSize: 16,
        fontWeight: 'regular',
    },
    description: {
        ...generalStyles.font,
        fontSize: 16,
        color: '#61646B',
    },
});
