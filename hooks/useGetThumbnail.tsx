import { useEffect, useState } from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';

const useGetThumbnail = (videoURL?: string) => {
    const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);

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
            } catch (error) {
                console.error('Ошибка при создании миниатюры:', error);
            }
        };
        videoURL && createThumbnail();
    }, [videoURL]);

    return { videoThumbnail, setVideoThumbnail };
};

export default useGetThumbnail;
