import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/SearchInput/SearchInput';
import { generalStyles } from '@/constants/theme';

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
            <ScrollView>
                {/* <FlatList
                data={[{ id: 1, text: 'Hello' }]}
                renderItem={({ item }) => <Text>{item.text}</Text>}
                ListHeaderComponent={({ item }) => <Text>Header </Text>}
            /> */}
            </ScrollView>
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
    },
});

export default Lessons;
