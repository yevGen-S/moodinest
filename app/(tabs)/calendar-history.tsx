import React, { useEffect, useState } from 'react';
import { generalStyles } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { getColorByMood } from '@/components/LastWeekCalendar/LastWeekCalendar';
import { supabase } from '@/supabase';
import { WithLoader } from '@/hoc/withLoader';
import { MoodIcon } from '@/components/MoodPicker/MoodPicker';
import { Image, StyleSheet, Text, View } from 'react-native';

type CalendarDataType = Record<string, { mood: number; icon: any }>;
type CalendarResponseType = {
    date: string;
    mood: number;
};

LocaleConfig.locales['ru'] = {
    monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    monthNamesShort: [
        'Янв.',
        'Февр.',
        'Март',
        'Апр.',
        'Май',
        'Июнь',
        'Июль',
        'Авг.',
        'Сент.',
        'Окт.',
        'Нояб.',
        'Дек.',
    ],
    dayNames: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня',
};

LocaleConfig.defaultLocale = 'ru';

// const mockCalendar: CalendarDataType = {
//     '2024-10-10': { marked: true, dotColor: getColorByMood(1) },
//     '2024-10-12': { marked: true, dotColor: getColorByMood(5) },
//     '2024-10-18': { marked: true, dotColor: getColorByMood(2) },
// };

const getCalendar = async () => {
    let { data, error } = await supabase.from('Calendar').select('date, mood');
    return { data, error };
};

const adaptCalendarData = (data: CalendarResponseType[]) => {
    const res: CalendarDataType = {};
    data.forEach(
        (item) =>
            (res[item.date] = {
                mood: item.mood,
                icon: MoodIcon[item.mood],
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

    const renderDay = ({ date }: any) => {
        const dayData = calendar?.[date.dateString];
        return (
            <View style={styles.dayContainer}>
                <Text style={styles.dateText}>{date.day}</Text>
                {dayData?.icon ? (
                    <Image
                        source={dayData.icon}
                        style={styles.iconStyle}
                        resizeMode="contain"
                    />
                ) : (
                    <View style={{ height: 23 }} />
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={generalStyles.container}>
            <WithLoader isLoading={isLoading}>
                <Calendar
                    hideArrows={false}
                    hideExtraDays={true}
                    firstDay={1}
                    markedDates={calendar}
                    dayComponent={({ date }: { date: any }) =>
                        renderDay({ date })
                    }
                />
            </WithLoader>
        </SafeAreaView>
    );
};

export default CalendarHistory;

const styles = StyleSheet.create({
    dayContainer: {
        alignItems: 'center',
    },
    dateText: {
        fontSize: 18,
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginTop: 3,
        marginLeft: 15,
    },
});
