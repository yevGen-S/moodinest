import { Text, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generalStyles } from '@/constants/theme';
import LastWeekCalendar from '@/components/LastWeekCalendar/LastWeekCalendar';
import images from '@/constants/images';
import MoodPicker from '@/components/MoodPicker/MoodPicker';
import CustomButton from '@/components/CustomButton/CustomButton';
import { supabase } from '@/supabase';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

interface CalendarEntry {
    userID: number;
    date: string;
    mood: number;
}

const fetchMoodDataFromBackend = async (currentDate: dayjs.Dayjs) => {
    const startOfWeek = currentDate.startOf('isoWeek').format('YYYY-MM-DD');
    const endOfWeek = currentDate.endOf('isoWeek').format('YYYY-MM-DD');

    let { data, error }: { data: CalendarEntry[] | null, error: any } = await supabase
        .from('Calendar')
        .select('*')
        .gte('date', startOfWeek)
        .lte('date', endOfWeek);

    if (error) {
        console.error(error);
        return { moodData: [], userID: 0 };
    }

    const userID = data?.[0]?.userID || 0;

    return {
        moodData: data?.map((item) => ({
            date: dayjs(item.date),
            mood: item.mood,
        })) || [],
        userID,
    };
};

const Main = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [moodData, setMoodData] = useState<{ date: dayjs.Dayjs, mood: number }[]>([]);
    const [userID, setUserID] = useState<number>(0);
    const [mood, setMood] = useState<number>(0);
    const [isToday, setIsToday] = useState<boolean>(false);
    const [changedMood, setChangedMood] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const { moodData, userID } = await fetchMoodDataFromBackend(currentDate);
            setMoodData(moodData);
            setUserID(userID);
        };
    
        fetchData();

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const { moodData, userID } = await fetchMoodDataFromBackend(currentDate);
            setMoodData(moodData);
            setUserID(userID);
        };
    
        fetchData();

    }, [changedMood, currentDate]);

    const insertMoodData = async (mood: number) => {
        const { data, error } = await supabase
            .from('Calendar')
            .insert([
                { userID: userID, date: currentDate.format('YYYY-MM-DD'), mood: mood },
            ])
            .select();
    
        if (error) {
            console.error('Error inserting mood data:', error);
            // Alert.alert('Что-то пошло не так!', 'Подтвердите выбор настроения :)');
        } else {
            console.log('Inserted mood data:', data);
        }
    };
    
    const updateMoodData = async (mood: number) => {
        const { data, error } = await supabase
            .from('Calendar')
            .update({ mood: mood })
            .eq('userID', userID)
            .eq('date', currentDate.format('YYYY-MM-DD'))
            .select();
    
        if (error) {
            console.error('Error updating mood data:', error);
        } else {
            console.log('Updated mood data:', data);
        }
    };

    return (
        <SafeAreaView
            style={{
                ...generalStyles.container,
                alignItems: 'center',
                gap: 25,
            }}
        >
            <Text style={styles.logoText}>MoodiNest</Text>
            <LastWeekCalendar currentDate={currentDate} moodData={moodData} setMood={setMood} setIsToday={setIsToday} />
            <Image
                source={images.meditation}
                style={styles.image}
                resizeMode="cover"
            />
            <MoodPicker mood={mood} isToday={isToday} insertMoodData={insertMoodData} updateMoodData={updateMoodData} setChangedMood={setChangedMood} />
            <CustomButton showText="Подобрать медитацию" />
        </SafeAreaView>
    );
};

export default Main;

const styles = StyleSheet.create({
    logoText: {
        ...generalStyles.font,
        fontSize: 36,
    },
    image: {
        width: 260,
        height: 260,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: '#AFB1B6',
    },
});
