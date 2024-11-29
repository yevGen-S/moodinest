import {
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

export type FavoriteLessonProps = {
    isFavourite?: boolean;
    handleFavoriteLessonChange: () => void;
    play: boolean;
};

const FavoriteLesson = ({
    isFavourite,
    handleFavoriteLessonChange,
    play,
}: FavoriteLessonProps) => {

    return (
        <TouchableOpacity
            style={play ? styles.bookmarkViewPlay : styles.bookmarkViewStop}
            onPress={handleFavoriteLessonChange}
        >
            {isFavourite ? (
                <Image
                    style={styles.bookmarkIcon}
                    tintColor={'#FFFFFF'}
                    source={icons.filledBookmark}
                    resizeMode="contain"
                />
            ) : (
                <Image
                    style={styles.bookmarkIcon}
                    tintColor={'#FFFFFF'}
                    source={icons.bookmark}
                    resizeMode="contain"
                />
            )}
        </TouchableOpacity>
    );
};

export default FavoriteLesson;

const styles = StyleSheet.create({
    bookmarkViewStop: {
        padding: 8,
        backgroundColor: '#8E8C8C',
        position: 'absolute',
        borderRadius: 8,
        top: 10,
        right: 10,
    },
    bookmarkViewPlay: {
        padding: 8,
        backgroundColor: '#8E8C8C',
        position: 'absolute',
        borderRadius: 8,
        top: 25,
        right: 20,
    },
    bookmarkIcon: {
        width: 20,
        height: 20,
    },
});
