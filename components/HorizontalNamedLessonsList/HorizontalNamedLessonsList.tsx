import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { generalStyles } from '@/constants/theme';
import EmptyState from '../EmptyState/EmptyState';
import Lesson from '../Lesson/Lesson';
import { router } from 'expo-router';

export type HorizontalNamedListProps = {
    name: string;
    data?: any[];
};

const mockData = [
    {
        videoURL: '',
        name: 'Lesson 123',
        isFavourite: false,
        duration: 5,
        description: 'awdawd',
        id: 1,
    },
    {
        videoURL: '',
        name: 'Lesson 123',
        isFavourite: false,
        duration: 5,
        id: 12,
    },
    {
        videoURL: '',
        name: 'Lesson 333',
        isFavourite: false,
        duration: 5,
        id: 2,
    },
    {
        videoURL: '',
        name: 'Lesson 7',
        isFavourite: false,
        duration: 5,
        id: 3,
    },
];

const HorizontalNamedLessonsList = ({
    name,
    data = mockData,
}: HorizontalNamedListProps) => {
    return (
        <View>
            <Text
                style={{
                    ...generalStyles.font,
                    fontWeight: 500,
                    marginBottom: 15,
                }}
            >
                {name}
            </Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Lesson
                        videoCardStyle={{ width: 300, height: 295 }}
                        key={item.id}
                        onPress={() =>
                            router.navigate({
                                pathname: '../(app)/meditation-card/[id]',
                                params: {
                                    id: item.id,
                                    name: item.name,
                                },
                            })
                        }
                        {...item}
                    />
                )}
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                ListEmptyComponent={() => (
                    <EmptyState title="Уроки не найдены..." />
                )}
                showsHorizontalScrollIndicator
                horizontal
            />
        </View>
    );
};

export default HorizontalNamedLessonsList;

const styles = StyleSheet.create({});
