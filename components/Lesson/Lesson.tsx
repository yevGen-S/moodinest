import { ImageURISource, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { generalStyles } from '@/constants/theme';
import VideoCard from './VideoCard';

export type LessonProps = {
    videoURL: string;
    thubnail?: ImageURISource;
    name: string;
    description?: string;
    isFavourite?: boolean;
    duration?: number;
};

const Lesson = ({
    videoURL,
    thubnail,
    name,
    description,
    isFavourite,
    duration,
}: LessonProps) => {
    const [play, setPlay] = useState(false);
    return (
        <View style={styles.container}>
            <VideoCard
                videoURL={videoURL}
                thubnail={thubnail}
                play={play}
                onPress={() => setPlay(true)}
                setPlay={setPlay}
                duration={duration}
                isFavourite={isFavourite}
            />
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
