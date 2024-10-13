import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Lesson, { LessonProps } from '@/components/Lesson/Lesson';
import { supabase } from '@/supabase';
import { Text, View } from 'react-native';
import HorizontalDivider from '@/components/HorizontalDivider/HorizontalDivider';
import CustomButton from '@/components/CustomButton/CustomButton';
import Rate from '@/components/Rate/Rate';

async function getMeditationById(id: string) {
    const { data, error } = await supabase
        .from('Lessons')
        .select('*')
        .eq('id', id);
    return { data, error };
}

const MeditationCard = () => {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<LessonProps | null>(null);

    useEffect(() => {
        const getData = async () => {
            const { data } = await getMeditationById(id as string);
            setData(data?.[0] as LessonProps);
        };
        getData();
    }, [id]);
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
            <View
                style={{
                    marginBottom: 40,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <CustomButton showText="Смотреть позже" />
            </View>
            <Rate />
            <Text style={{ fontFamily: 'Work-Sans', color: '#AFB1B6' }}>
                Оцените видео
            </Text>
        </View>
    );
};

export default MeditationCard;
