import {
    Image,
    ImageURISource,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import icons from '@/constants/icons';
import { generalStyles } from '@/constants/theme';

type LessonProps = {
    video?: string;
    thubnail?: ImageURISource;
    name: string;
    description?: string;
    isFavourite?: string;
    duration?: string;
};

const Lesson = ({
    video,
    thubnail,
    name,
    description,
    isFavourite,
    duration,
}: LessonProps) => {
    const [play, setPlay] = useState(false);

    return (
        <View style={styles.container}>
            {play ? (
                <Text>Playing</Text>
            ) : (
                <TouchableOpacity style={styles.videoArea}>
                    {thubnail && (
                        <Image
                            source={thubnail}
                            style={styles.thubnail}
                            resizeMode="cover"
                        />
                    )}
                    <Image
                        style={styles.playIcon}
                        source={icons.play}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
            <View style={{ alignSelf: 'flex-start' }}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

export default Lesson;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        gap: 15,
        height: 278,
        borderWidth: 1,
        borderColor: '#EFEFF0',
        borderRadius: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    thubnail: {
        width: '100%',
        height: '100%',
    },
    videoArea: {
        backgroundColor: '#EFEFF0',
        width: '100%',
        height: 200,
        borderWidth: 2,
        borderColor: '#AFB1B6',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
    },
    title: {
        ...generalStyles.font,
        fontSize: 16,
        fontWeight: 'regular',
    },
    description: {
        ...generalStyles.font,
        fontSize: 16,
        color: '#61646B',
    },
});
