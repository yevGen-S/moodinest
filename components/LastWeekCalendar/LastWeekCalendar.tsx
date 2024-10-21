import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { generalStyles } from '@/constants/theme';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { supabase } from '@/supabase';

dayjs.extend(isoWeek);

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

interface LastWeekCalendarProps {
    currentDate: dayjs.Dayjs;
    moodData: object;
    setMood: (mood: number) => void;
    setIsToday: (isToday: boolean) => void;
}

const getColorByMood = (mood: number) => {
    switch (mood) {
        case 1:
            return 'rgba(233, 124, 124, 0.9)';
        case 2:
            return 'rgba(233, 175, 120, 0.9)';
        case 3:
            return 'rgba(243, 242, 206, 0.9)';
        case 4:
            return 'rgba(240, 238, 133, 0.9)';
        case 5:
            return 'rgba(179, 218, 125, 0.9)';
        default:
            return 'rgb(255, 255, 255)';
    }
};


const LastWeekCalendar: React.FC<LastWeekCalendarProps> = ({ currentDate, moodData, setMood, setIsToday }) => {
    const [selectedDate, setSelectedDate] = useState(currentDate);

    useEffect(() => {
        handleDateSelect(currentDate);
    }, [moodData]);

    const getWeekDates = () => {
        const startOfWeek = currentDate.startOf('isoWeek');
        return Array.from({ length: 7 }, (_, index) => startOfWeek.add(index, 'day'));
    };

    const isToday = (date: dayjs.Dayjs) => date.isSame(currentDate, 'day');
    const isFuture = (date: dayjs.Dayjs) => date.isAfter(currentDate, 'day');

    const getMoodForDate = (date: dayjs.Dayjs) => {
        const formattedDate = date.format('YYYY-MM-DD');
    
        const moodEntry = moodData.find(mood => {
            const formattedMoodDate = mood.date.format('YYYY-MM-DD');
            // const formattedMoodDate = dayjs(mood.date).format('YYYY-MM-DD');
            return formattedDate === formattedMoodDate;
        });
    
        return moodEntry ? moodEntry.mood : 0;
    };
    

    const handleDateSelect = (date: dayjs.Dayjs) => {
        setSelectedDate(date);
        const mood = getMoodForDate(date);
        setMood(mood);
        setIsToday(isToday(date));
    };

    return (
        <View style={styles.container}>
            { getWeekDates().map((date, index) => {
                const mood = getMoodForDate(date);
                const moodColor = mood ? getColorByMood(mood) : '#FFFFFF';

                return (
                    <TouchableOpacity
                        key={index}
                        disabled={isFuture(date)}
                        style={[
                            styles.dateContainer,
                            isFuture(date) && styles.disabledDate
                        ]}
                        onPress={() => handleDateSelect(date)}
                    >
                        <Text style={[styles.day, isFuture(date) && styles.disabledText]}>
                            {daysOfWeek[index]}
                        </Text>
                        <Text
                            style={[
                                styles.date,
                                { backgroundColor: moodColor },
                                isToday(date) && styles.todayBorder,
                                isFuture(date) && styles.disabledText,
                                date.isSame(selectedDate, 'day') && styles.selectedDayBorder
                            ]}
                        >
                            {date.format('D')}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default LastWeekCalendar;

const styles = StyleSheet.create({
    container: {
        width: '85%',
        flexDirection: 'row',
        gap: 10,
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    dateContainer: {
        alignItems: 'center',
    },
    day: {
        ...generalStyles.font,
        color: '#939393',
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
        width: 30,
    },
    date: {
        ...generalStyles.font,
        textAlign: 'center',
        width: 30,
        height: 30,
        paddingVertical: 2,
        borderRadius: 1000,
    },
    todayBorder: {
        borderColor: '#AFB1B6',
        borderWidth: 2,
    },
    selectedDayBorder: {
        borderColor: '#19191B',
        borderWidth: 1,
    },
    disabledDate: {
        opacity: 0.5,
    },
    disabledText: {
        color: '#AFB1B6',
    },
});
