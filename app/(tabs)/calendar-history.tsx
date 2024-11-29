import React, { useEffect, useState } from 'react';
import { generalStyles } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { supabase } from '@/supabase';
import { WithLoader } from '@/hoc/withLoader';
import { MoodIcon } from '@/components/MoodPicker/MoodPicker';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

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

const getCalendar = async (userID: string) => {
    let { data, error } = await supabase
        .from('Calendar')
        .select('date, mood')
        .eq('userID', userID);
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
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async (userID: string) => {
            setIsLoading(true);
            const { data, error } = await getCalendar(userID);
            if (error) {
                console.log(error);
                return;
            }
            if (data) {
                setCalendar(adaptCalendarData(data));
                setIsLoading(false);
            }
        };

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                fetchData(session?.user.id);
            }
        });
    }, [isFocused]);

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
        marginLeft: 20,
    },
});
