import { useEffect, useState } from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';

const useGetThumbnail = (videoURL?: string) => {
    const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const createThumbnail = async () => {
            setIsLoading(true);
            try {
                const { uri } = await VideoThumbnails.getThumbnailAsync(
                    videoURL ?? '',
                    {
                        time: 2000,
                    }
                );
                setVideoThumbnail(uri);
            } catch (error) {
                console.error('Ошибка при создании миниатюры:', error);
            }
            setIsLoading(false);
        };
        videoURL && createThumbnail();
    }, [videoURL]);

    return { videoThumbnail, setVideoThumbnail, isLoading };
};

export default useGetThumbnail;
