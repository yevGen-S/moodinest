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
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as VideoThumbnails from 'expo-video-thumbnails';
import useGetThumbnail from '@/hooks/useGetThumbnail';

type VideoCardProps = {
    play: boolean;
    onPress: () => void;
    setPlay: (value: boolean) => void;
    videoURL: string;
    thubnail?: ImageURISource;
    duration?: number;
    isFavourite?: boolean;
};

const VideoCard = ({
    play,
    onPress,
    duration,
    isFavourite = false,
    videoURL,
}: VideoCardProps) => {
    const videoRef = useRef<Video | null>(null);
    const { videoThumbnail } = useGetThumbnail(videoURL);

    const [currentResizeMode, setCurrentResizeMode] = useState<
        ResizeMode.COVER | ResizeMode.CONTAIN
    >(ResizeMode.COVER);

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
                    />
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
                    <TouchableOpacity style={styles.bookmarkView}>
                        <Image
                            style={
                                isFavourite
                                    ? styles.bookmarkIcon
                                    : styles.bookmarkIcon
                            }
                            tintColor={isFavourite ? 'yellow' : '#FFFFFF'}
                            source={icons.bookmark}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
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
    bookmarkIcon: {
        width: 20,
        height: 20,
    },
});
