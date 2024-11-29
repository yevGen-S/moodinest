import {
    Image,
    ImageURISource,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import icons from '@/constants/icons';
import { StatusBar } from 'expo-status-bar';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import useGetThumbnail from '@/hooks/useGetThumbnail';
import FavoriteLesson from './FavoriteLesson';

export type VideoCardProps = {
    play: boolean;
    onPress: () => void;
    setPlay: (value: boolean) => void;
    videoURL: string;
    thubnail?: ImageURISource;
    duration?: number;
    isFavourite?: boolean;
    insertFavoriteLesson: () => void;
    deleteFavoriteLesson: () => void;
};

const VideoCard = ({
    play,
    onPress,
    duration,
    isFavourite,
    videoURL,
    insertFavoriteLesson,
    deleteFavoriteLesson,
}: VideoCardProps) => {
    const videoRef = useRef<Video | null>(null);
    const { videoThumbnail } = useGetThumbnail(videoURL);

    const [currentResizeMode, setCurrentResizeMode] = useState<
        ResizeMode.COVER | ResizeMode.CONTAIN
    >(ResizeMode.COVER);

    const [isPlaying, setIsPlaying] = useState(false);

    const handleOrientationChange = async () => {
        const orientation = await ScreenOrientation.getOrientationAsync();

        if (orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
            setCurrentResizeMode(ResizeMode.CONTAIN);
        } else {
            setCurrentResizeMode(ResizeMode.COVER);
        }
    };

    useEffect(() => {
        const lockOrientation = async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.DEFAULT
            );
        };

        lockOrientation();

        const subscription = ScreenOrientation.addOrientationChangeListener(
            handleOrientationChange
        );

        handleOrientationChange();

        return () => {
            subscription.remove();
        };
    }, []);

    const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
        }
    };

    const handleFavoriteLessonChange = () => {
        if (isFavourite) {
            deleteFavoriteLesson();
        } else {
            insertFavoriteLesson();
        }
    };

    return (
        <>
            {play ? (
                <>
                    <Video
                        ref={videoRef}
                        style={styles.videoArea}
                        source={{
                            uri: videoURL,
                        }}
                        useNativeControls
                        resizeMode={currentResizeMode}
                        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                    />
                    {!isPlaying && (
                        <FavoriteLesson
                            isFavourite={isFavourite}
                            handleFavoriteLessonChange={handleFavoriteLessonChange}
                            play={play}
                        />
                    )}
                    <StatusBar style="auto" />
                </>
            ) : (
                <TouchableOpacity
                    style={styles.videoArea}
                    activeOpacity={0.7}
                    onPress={onPress}
                >
                    {videoThumbnail && (
                        <Image
                            source={{ uri: videoThumbnail }}
                            style={styles.thubnail}
                            resizeMode="cover"
                        />
                    )}
                    <Image
                        style={styles.playIcon}
                        source={icons.play}
                        resizeMode="contain"
                    />
                    {duration && (
                        <View style={styles.duration}>
                            <Text style={{ color: '#FFFFFF' }}>
                                {duration} минут
                            </Text>
                        </View>
                    )}
                    <FavoriteLesson
                        isFavourite={isFavourite}
                        handleFavoriteLessonChange={handleFavoriteLessonChange}
                        play={play}
                    />
                </TouchableOpacity>
            )}
        </>
    );
};

export default VideoCard;

const styles = StyleSheet.create({
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
    thubnail: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    playIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
    },
    bookmarkView: {
        padding: 8,
        backgroundColor: '#8E8C8C',
        position: 'absolute',
        borderRadius: 8,
        top: 10,
        right: 10,
    },
    duration: {
        padding: 8,
        backgroundColor: '#8E8C8C',
        position: 'absolute',
        borderRadius: 8,
        bottom: 20,
        left: 10,
    },
});
