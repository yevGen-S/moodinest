import {
    Image,
    ImageURISource,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import icons from '@/constants/icons';
import { StatusBar } from 'expo-status-bar';
import { Video, ResizeMode } from 'expo-av';

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
    thubnail,
    duration,
    isFavourite = false,
    videoURL,
}: VideoCardProps) => {
    const video = useRef(null);
    return (
        <>
            {play ? (
                <>
                    <Video
                        ref={video}
                        style={styles.videoArea}
                        source={{
                           uri: videoURL
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                    />
                    <StatusBar style="auto" />
                </>
            ) : (
                <TouchableOpacity
                    style={styles.videoArea}
                    activeOpacity={0.7}
                    onPress={onPress}
                >
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
