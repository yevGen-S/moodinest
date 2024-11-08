import { useEffect, useState } from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';

const useGetThumbnail = (videoURL?: string) => {
    const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const createThumbnail = async () => {
            try {
                const { uri } = await VideoThumbnails.getThumbnailAsync(
                    videoURL ?? '',
                    {
                        time: 15000,
                    }
                );
                setVideoThumbnail(uri);
                setIsLoading(false);
            } catch (error) {
                console.error('Ошибка при создании миниатюры:', error);
                setIsLoading(false);
            }
        };
        videoURL && createThumbnail();
    }, [videoURL]);

    return { videoThumbnail, setVideoThumbnail, isLoading };
};

export default useGetThumbnail;
