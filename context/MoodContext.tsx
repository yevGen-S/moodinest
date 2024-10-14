import React, { createContext, useState } from 'react';

interface MoodContextProps {
    mood: number | null;
    isToday: boolean;
    setMood: (mood: number) => void;
    setIsToday: (isToday: boolean) => void;
}

export const MoodContext = createContext<MoodContextProps>({
    mood: null,
    isToday: false,
    setMood: () => {},
    setIsToday: () => {},
});

export const MoodProvider = ({ children }: { children: React.ReactNode }) => {
    const [mood, setMood] = useState<number | null>(null);
    const [isToday, setIsToday] = useState<boolean>(false);

    return (
        <MoodContext.Provider value={{ mood, isToday, setMood, setIsToday }}>
            {children}
        </MoodContext.Provider>
    );
};
