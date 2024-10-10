import {
    GestureResponderEvent,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

type SearchInputProps = {
    value: string;
    placeHolder: string;
    activateFilters?: () => void;
    onChangeText?: (text: string) => void;
    onSubmit?: (event: GestureResponderEvent) => void;
};

const SearchInput = ({
    value,
    placeHolder,
    onChangeText,
    onSubmit,
}: SearchInputProps) => {
    return (
        <View style={styles.sBlock}>
            <View style={styles.search}>
                <TextInput
                    value={value}
                    placeholder={placeHolder}
                    inlineImageLeft="true"
                    inlineImagePadding={10}
                    style={styles.input}
                    onChangeText={onChangeText}
                />
                <TouchableOpacity onPress={onSubmit}>
                    <Image
                        style={styles.sIcon}
                        source={icons.search}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.filter}>
                <Image
                    style={styles.fIcon}
                    source={icons.filter}
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;

const styles = StyleSheet.create({
    sBlock: {
        flexDirection: 'row',
        gap: 16,
        width: '90%',
    },
    search: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 60,
        backgroundColor: '#EFEFF0',
        height: 44,
        gap: 10,
    },
    input: {
        flex: 1,
        color: '#AFB1B6',
    },
    sIcon: {
        width: 20,
        height: 20,
        padding: 10,
    },
    filter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
        backgroundColor: '#EFEFF0',
        borderRadius: 100,
    },
    fIcon: {
        width: 20,
        height: 20,
    },
});
