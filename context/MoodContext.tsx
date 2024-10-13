import React, { createContext, useState } from 'react';

interface MoodContextProps {
    mood: number | null;
    isToday: boolean;
    userID: number;
    setMood: (mood: number) => void;
    setIsToday: (isToday: boolean) => void;
}

export const MoodContext = createContext<MoodContextProps>({
    mood: null,
    isToday: false,
    userID: 0,
    setMood: () => {},
    setIsToday: () => {}
});

export const MoodProvider = ({ children }: { children: React.ReactNode }) => {
    const [mood, setMood] = useState<number | null>(null);
    const [isToday, setIsToday] = useState<boolean>(false);
    const [userID, setUserID] = useState<number>(0);

    return (
        <MoodContext.Provider value={{ mood, isToday, userID, setMood, setIsToday}}>
            {children}
        </MoodContext.Provider>
    );
};
