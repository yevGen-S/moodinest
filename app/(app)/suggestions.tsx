import { FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import EmptyState from '@/components/EmptyState/EmptyState';
import { supabase } from '@/supabase';
import PreviewLesson, {
    PreviewLessonProps,
} from '@/components/PreviewLesson/PreviewLesson';
import { WithLoader } from '@/hoc/withLoader';
import { useLocalSearchParams } from 'expo-router';

const getMeditationsSuggestions = async (mood: number) => {
    const { data, error } = await supabase
        .from('Lessons')
        .select('*')
        .eq('mood', mood)
        .order('order', { ascending: true });
    return { data, error };
};

const Suggestions = () => {
    const { mood } = useLocalSearchParams();
    const [data, setData] = useState<PreviewLessonProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const { data } = await getMeditationsSuggestions(+mood);
                setData(data as PreviewLessonProps[]);
                console.log(data);
                
            } catch (e) {
                console.log(e);
            }
            setIsLoading(false);
        };

        getData();
    }, [mood]);

    return (
        <WithLoader isLoading={isLoading}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Work-Sans',
                        fontSize: 24,
                        width: '80%',
                        flexWrap: 'wrap',
                        textAlign: 'center',
                        marginBottom: 50,
                        marginTop: 15,
                    }}
                >
                    Медитации, подходящие вашему настроению:
                </Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={{
                        width: '100%',
                        alignItems: 'center',
                    }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        width: '90%',
                    }}
                    renderItem={({ item }) => <PreviewLesson {...item} />}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 20 }} />
                    )}
                    ListEmptyComponent={() => (
                        <EmptyState title="Медитации по настроению не найдены..." />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </WithLoader>
    );
};

export default Suggestions;
