import React from 'react';
import { generalStyles } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { getColorByMood } from '@/components/LastWeekCalendar/LastWeekCalendar';

const mockCalendar = {
    '2024-10-10': { marked: true, dotColor: getColorByMood(1) },
    '2024-10-12': { marked: true, dotColor: getColorByMood(5) },
    '2024-10-18': { marked: true, dotColor: getColorByMood(2) },
};

const CalendarHistory = () => {
    return (
        <SafeAreaView style={generalStyles.container}>
            <Calendar
                hideArrows={false}
                hideExtraDays={true}
                firstDay={1}
                markedDates={mockCalendar}
                markingType={'dot'}
            />
        </SafeAreaView>
    );
};

export default CalendarHistory;
