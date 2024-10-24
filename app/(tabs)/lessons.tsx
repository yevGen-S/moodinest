import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/SearchInput/SearchInput';
import { generalStyles } from '@/constants/theme';
import EmptyState from '@/components/EmptyState/EmptyState';
import Lesson from '@/components/Lesson/Lesson';
import HorizontalDivider from '@/components/HorizontalDivider/HorizontalDivider';
import { supabase } from '@/supabase';

async function getData() {
    const { data, error } = await supabase
        .from('Lessons')
        .select('*')
        .order('order', {ascending: true});
    return { data, error };
}

const Lessons = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getData();            
            setData(res.data ?? []);
        };
        fetchData();
    }, []);
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
            <HorizontalDivider />
            <FlatList
                data={data}
                renderItem={({ item }) => <Lesson {...item} />}
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
    searchRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
});

export default Lessons;
