import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { generalStyles } from '@/constants/theme';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { MoodContext } from '@/context/MoodContext';

dayjs.extend(isoWeek);

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// Функция для имитации получения данных с бэка
const fetchMoodData = (currentDate: dayjs.Dayjs) => {
    const today = currentDate.isoWeekday();
    // данные только за прошедшие и сегодняшний дни
    return Array.from({ length: today }, (_, index) => ({
        date: currentDate.startOf('isoWeek').add(index, 'day'),
        mood: Math.floor(Math.random() * 5) + 1, // настроение от 1 до 5
    }));
};

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

const LastWeekCalendar = () => {
    const { setMood, setIsToday } = useContext(MoodContext);
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [moodData, setMoodData] = useState<{ date: dayjs.Dayjs, mood: number }[]>([]);

    useEffect(() => {
        // Эмулируем получение данных по настроению с бэка
        const data = fetchMoodData(currentDate);
        setMoodData(data);
    }, [currentDate]);

    const getWeekDates = () => {
        // начало недели с понедельника
        const startOfWeek = currentDate.startOf('isoWeek');
        return Array.from({ length: 7 }, (_, index) => startOfWeek.add(index, 'day'));
    };

    const isToday = (date: dayjs.Dayjs) => date.isSame(currentDate, 'day');
    const isFuture = (date: dayjs.Dayjs) => date.isAfter(currentDate, 'day');

    const getMoodForDate = (date: dayjs.Dayjs) => {
        const moodEntry = moodData.find(mood => date.isSame(mood.date, 'day'));
        return moodEntry ? moodEntry.mood : null;
    };

    const handleDateSelect = (date: dayjs.Dayjs) => {
        setSelectedDate(date);
        const mood = getMoodForDate(date);
        setMood(mood || 0);
        setIsToday(isToday(date));
    };

    return (
        <View style={styles.container}>
            {getWeekDates().map((date, index) => {
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
