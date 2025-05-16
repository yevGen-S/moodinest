import { Text, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generalStyles } from '@/constants/theme';
import LastWeekCalendar from '@/components/LastWeekCalendar/LastWeekCalendar';
import images from '@/constants/images';
import icons from '@/constants/icons';
import MoodPicker from '@/components/MoodPicker/MoodPicker';
import CustomButton from '@/components/CustomButton/CustomButton';
import { supabase } from '@/supabase';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { router } from 'expo-router';
import { dateFormat } from '@/constants/date';
import { MoodRecord } from '@/constants/mood';
import { WithLoader } from '@/hoc/withLoader';
import { Session } from '@supabase/supabase-js';
import { useIsFocused } from '@react-navigation/native';

dayjs.extend(isoWeek);

interface CalendarEntry {
    userID: string;
    date: string;
    mood: number;
}

const fetchMoodData = async (currentDate: dayjs.Dayjs, userID: string) => {
    const startOfWeek = currentDate.startOf('isoWeek').format(dateFormat);
    const endOfWeek = currentDate.endOf('isoWeek').format(dateFormat);

    let { data, error }: { data: CalendarEntry[] | null; error: any } =
        await supabase
            .from('Calendar')
            .select('*')
            .eq('userID', userID)
            .gte('date', startOfWeek)
            .lte('date', endOfWeek);

    if (error) {
        console.error(error);
        return { moodData: {}, userID: '' };
    }

    return {
        moodData:
            data?.reduce<MoodRecord>((acc, item) => {
                acc[dayjs(item.date).format(dateFormat)] = item.mood;
                return acc;
            }, {}) || {},
        userID,
    };
};

const Main = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [moodData, setMoodData] = useState<MoodRecord>({});
    const [pickedMood, setPickedMood] = useState<number>(0);
    const [isToday, setIsToday] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState<Session | null>(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
    }, [isFocused]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (session) {
                    const { moodData } = await fetchMoodData(
                        currentDate,
                        session?.user.id
                    );
                    setMoodData(moodData);
                    setPickedMood(moodData[currentDate.toString()] ?? 0);
                }
            } catch (e) {
                console.log(e);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [session]);

    const handleChangeMood = (mood: number) => {
        const prevMoodData = { ...moodData } as MoodRecord;
        const prevMood = pickedMood;
        setMoodData({
            ...moodData,
            [currentDate.format(dateFormat)]: mood,
        });
        setPickedMood(mood);
        return () => {
            setMoodData(prevMoodData);
            setPickedMood(prevMood);
        };
    };

    const insertMoodData = async (mood: number) => {
        const revertChange = handleChangeMood(mood);
        const { data, error } = await supabase
            .from('Calendar')
            .insert([
                {
                    userID: session?.user.id,
                    date: currentDate.format(dateFormat),
                    mood: mood,
                },
            ])
            .select();

        if (error) {
            console.error('Error inserting mood data:', error);
            revertChange();
        } else {
            console.log('Inserted mood data:', data);
        }
    };

    const updateMoodData = async (mood: number) => {
        const revertChange = handleChangeMood(mood);
        const { data, error } = await supabase
            .from('Calendar')
            .update({ mood: mood })
            .eq('userID', session?.user.id)
            .eq('date', currentDate.format(dateFormat))
            .select();

        if (error) {
            console.error('Error updating mood data:', error);
            revertChange();
        } else {
            console.log('Updated mood data:', data);
        }
    };

    return (
        <SafeAreaView
            style={{
                ...generalStyles.container,
                alignItems: 'center',
                gap: 22,
            }}
        >
            <WithLoader isLoading={isLoading}>
                <>
                    <Text style={styles.logoText}>MoodiNest</Text>
                    <LastWeekCalendar
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        moodData={moodData}
                        setIsToday={setIsToday}
                    />
                    <Image
                        source={images.meditation}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    <MoodPicker
                        mood={moodData[currentDate.format(dateFormat)] ?? 0}
                        isToday={isToday}
                        insertMoodData={insertMoodData}
                        updateMoodData={updateMoodData}
                    />

                    <CustomButton
                        showText="Подобрать медитацию"
                        onPress={() =>
                            router.navigate({
                                pathname: '../(app)/suggestions',
                                params: {
                                    mood: moodData[
                                        currentDate.format(dateFormat)
                                    ],
                                },
                            })
                        }
                    />

                    <CustomButton
                        showText="Пройти опрос"
                        style={{backgroundColor: '#D9D9D9'}}
                        textStyle={{ color: '#000000' }}
                        icon={icons.heart}
                        onPress={() =>
                            router.navigate({
                                pathname: '../(app)/testAI/testQuestions',
                            })
                        }
                    />
                </>
            </WithLoader>
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
        width: 220,
        height: 220,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: '#AFB1B6',
    },
});
