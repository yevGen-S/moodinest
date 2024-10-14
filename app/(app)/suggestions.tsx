import { FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import EmptyState from '@/components/EmptyState/EmptyState';
import { supabase } from '@/supabase';
import PreviewLesson, {
    PreviewLessonProps,
} from '@/components/PreviewLesson/PreviewLesson';
import images from '@/constants/images';

const getMeditationsAccordingToMood = async (mood: number) => {
    const { data, error } = await supabase
        .from('Lessons')
        .select('*')
        .eq('mood', mood)
        .order('order', { ascending: true });
    return { data, error };
};

const mockSuggestions = [
    { id: '1', name: 'Mock Meditation 1', thumbnail: images.meditation },
    { id: '2', name: 'Mock Meditation 2' },
    { id: '3', name: 'Mock Meditation 3' },
    { id: '4', name: 'Mock Meditation 3' },
];

const Suggestions = () => {
    const [data, setData] = useState<PreviewLessonProps[]>(mockSuggestions);

    const mockCurrentMood = 1;

    useEffect(() => {
        const getData = async () => {
            const { data } = await getMeditationsAccordingToMood(
                mockCurrentMood
            );
            setData([...(data as PreviewLessonProps[]), ...mockSuggestions]);
        };

        getData();
    }, []);

    return (
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
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                ListEmptyComponent={() => (
                    <EmptyState title="Медитации по настроению не найдены..." />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Suggestions;
