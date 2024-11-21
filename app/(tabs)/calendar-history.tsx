import React, { useEffect, useState } from 'react';
import { generalStyles } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { getColorByMood } from '@/components/LastWeekCalendar/LastWeekCalendar';
import { supabase } from '@/supabase';
import { WithLoader } from '@/hoc/withLoader';

type CalendarDataType = Record<string, { marked: boolean; dotColor: string }>;
type CalendarResponseType = {
    date: string;
    mood: number;
};

const mockCalendar: CalendarDataType = {
    '2024-10-10': { marked: true, dotColor: getColorByMood(1) },
    '2024-10-12': { marked: true, dotColor: getColorByMood(5) },
    '2024-10-18': { marked: true, dotColor: getColorByMood(2) },
};

const getCalendar = async () => {
    let { data, error } = await supabase.from('Calendar').select('date, mood');
    return { data, error };
};

const adaptCalendarData = (data: CalendarResponseType[]) => {
    const res: CalendarDataType = {};
    data.forEach(
        (item) =>
            (res[item.date] = {
                marked: true,
                dotColor: getColorByMood(item.mood),
            })
    );
    return res;
};

const CalendarHistory = () => {
    const [calendar, setCalendar] = useState<CalendarDataType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { data, error } = await getCalendar();
            if (error) {
                console.log(error);
                return;
            }
            if (data) {
                setCalendar(adaptCalendarData(data));
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView style={generalStyles.container}>
            <WithLoader isLoading={isLoading}>
                <Calendar
                    hideArrows={false}
                    hideExtraDays={true}
                    firstDay={1}
                    markedDates={calendar}
                    markingType={'dot'}
                />
            </WithLoader>
        </SafeAreaView>
    );
};

export default CalendarHistory;
