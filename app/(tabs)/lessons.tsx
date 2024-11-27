import {
    FlatList,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    LayoutAnimation,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/SearchInput/SearchInput';
import { generalStyles } from '@/constants/theme';
import EmptyState from '@/components/EmptyState/EmptyState';
import Lesson from '@/components/Lesson/Lesson';
import HorizontalDivider from '@/components/HorizontalDivider/HorizontalDivider';
import { supabase } from '@/supabase';
import { WithLoader } from '@/hoc/withLoader';
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

async function getLessons() {
    const { data, error } = await supabase
        .from('Lessons')
        .select('*')
        .order('order', { ascending: true });
    return { data, error };
}

const Lessons = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [originalData, setOriginalData] = useState<any[]>([]);
    const [activeFilter, setActiveFilter] = useState<
        'name' | 'duration' | 'date' | null
    >('name');
    const [sortDirection, setSortDirection] = useState<boolean>(false); // Состояние направления сортировки (true - по убыванию, false - по возрастанию)
    const [shouldShowFilters, setShouldShowFilters] = useState<boolean>(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await getLessons();
                setData(res.data ?? []);
                setOriginalData(res.data ?? []);
            } catch (e) {
                console.error(e);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [isFocused]);

    const handleFilter = (filterType: 'name' | 'duration' | 'date') => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShouldShowFilters(true);

        let newSortDirection = false;

        if (activeFilter === filterType) {
            newSortDirection = !sortDirection;
        } else {
            setActiveFilter(filterType);
        }

        setSortDirection(newSortDirection);

        let sortedData = [...data];
        switch (filterType) {
            case 'name':
                sortedData.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    return newSortDirection
                        ? nameB.localeCompare(nameA)
                        : nameA.localeCompare(nameB);
                });
                break;
            case 'duration':
                sortedData.sort((a, b) =>
                    newSortDirection
                        ? b.duration - a.duration
                        : a.duration - b.duration
                );
            case 'date':
                sortedData.sort((a, b) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return newSortDirection
                        ? dateB.getTime() - dateA.getTime()
                        : dateA.getTime() - dateB.getTime();
                });
                break;
        }
        setData(sortedData);
    };

    const handleSearchChange = (text: string) => {
        setSearch(text);
        const filteredData = originalData.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setData(filteredData);
    };

    return (
        <SafeAreaView style={generalStyles.container}>
            <WithLoader isLoading={isLoading}>
                <View style={styles.searchRow}>
                    <SearchInput
                        activateFilters={() => {
                            LayoutAnimation.configureNext(
                                LayoutAnimation.Presets.easeInEaseOut
                            );
                            setShouldShowFilters(!shouldShowFilters);
                        }}
                        value={search}
                        placeHolder={'Введите название'}
                        onChangeText={handleSearchChange}
                    />
                </View>
                {shouldShowFilters && (
                    <View style={styles.filterButtons}>
                        <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => handleFilter('name')}
                        >
                            <Text>По имени</Text>
                            {activeFilter === 'name' && (
                                <Icon
                                    style={styles.filterIconButton}
                                    name={
                                        sortDirection
                                            ? 'chevron-down-outline'
                                            : 'chevron-up-outline'
                                    }
                                    size={20}
                                />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => handleFilter('duration')}
                        >
                            <Text>По длительности</Text>
                            {activeFilter === 'duration' && (
                                <Icon
                                    style={styles.filterIconButton}
                                    name={
                                        sortDirection
                                            ? 'chevron-down-outline'
                                            : 'chevron-up-outline'
                                    }
                                    size={20}
                                />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => handleFilter('date')}
                        >
                            <Text>По дате</Text>
                            {activeFilter === 'date' && (
                                <Icon
                                    style={styles.filterIconButton}
                                    name={
                                        sortDirection
                                            ? 'chevron-down-outline'
                                            : 'chevron-up-outline'
                                    }
                                    size={20}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
                <HorizontalDivider />
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <Lesson
                            key={item.id + item.duration}
                            {...item}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 20 }} />
                    )}
                    ListEmptyComponent={() => (
                        <EmptyState title="Уроки не найдены..." />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: 20,
                    }}
                />
            </WithLoader>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    searchRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    filterButtons: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '90%',
    },
    filterButton: {
        display: 'flex',
        gap: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    filterIconButton: {
        paddingTop: 3,
    },
});

export default Lessons;
