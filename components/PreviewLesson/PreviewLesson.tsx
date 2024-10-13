import {
    Image,
    ImageURISource,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import useGetThumbnail from '@/hooks/useGetThumbnail';

export type PreviewLessonProps = {
    id: string;
    videoURL?: string;
    thumbnail?: ImageURISource;
    name: string;
};

const PreviewLesson = ({ name, videoURL, thumbnail }: PreviewLessonProps) => {
    const { videoThumbnail } = useGetThumbnail(videoURL);

    return (
        <View
            style={{
                width: '48%',
                height: 128,
                borderWidth: 1,
                borderColor: '#EFEFF0',
                borderRadius: 12,
                gap: 15,
            }}
        >
            <TouchableOpacity
                style={{
                    backgroundColor: '#EFEFF0',
                    width: '100%',
                    height: '100%',
                    borderWidth: 2,
                    borderColor: '#AFB1B6',
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
                activeOpacity={0.7}
                onPress={() => {}}
            >
                {videoThumbnail && (
                    <Image
                        source={
                            videoThumbnail ? { uri: videoThumbnail } : thumbnail
                        }
                        resizeMode="cover"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 6,
                        }}
                    />
                )}
                <Text
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        backgroundColor: '#8E8C8C',
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        borderRadius: 16,
                        color: '#ffffff',
                    }}
                >
                    {name}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PreviewLesson;
