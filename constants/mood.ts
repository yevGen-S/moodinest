import dayjs from 'dayjs';

export type MoodData = { date: dayjs.Dayjs; mood: string };
export type MoodRecord = { [key: string]: number };
