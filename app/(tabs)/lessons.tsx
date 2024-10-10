import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/SearchInput/SearchInput';
import { generalStyles } from '@/constants/theme';
import EmptyState from '@/components/EmptyState/EmptyState';
import Lesson from '@/components/Lesson/Lesson';

const Lessons = () => {
    const [search, setSearch] = useState('');
    return (
        <SafeAreaView style={generalStyles.container}>
            <View style={styles.searchRow}>
                <SearchInput
                    value={search}
                    placeHolder={'Введите название'}
                    onChangeText={setSearch}
                    onSubmit={() => {}}
                />
            </View>
            <View
                style={{
                    borderBottomColor: '#EFEFF0',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginBottom: 20,
                }}
            />
            <FlatList
                data={[
                    { id: 1, name: 'Lesson 1', description: 'Nice lesson' },
                    { id: 2, name: 'Lesson 2', description: 'Nice lesson' },
                    { id: 3, name: 'Lesson 3', description: 'Nice lesson' },
                ]}
                renderItem={({ item }) => (
                    <Lesson
                        name={item.name}
                        description={item.description}
                    />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                ListEmptyComponent={() => (
                    <EmptyState title="Уроки не найдены..." />
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    video: {
        fontFamily: 'Work-Sans',
        fontWeight: 'bold',
        fontSize: 100,
    },
    searchRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
});

export default Lessons;
