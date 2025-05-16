import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { generalStyles } from '@/constants/theme';
import icons from '@/constants/icons';

type WeatherType = {
    latitude: number;
    longitude: number;
    temp: number;
    speed: number;
    deg: number;
    humidity: number;
    pressure: number;
    main: string;
};

export const Weather = () => {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [weather, setWeather] = useState<WeatherType | null>(null);

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            let res = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&APPID=57382826ba70b0b8e5c2c32a48104cc7`,
                {
                    method: 'GET',
                }
            );
            const whether = await res.json();

            setWeather({
                latitude,
                longitude,
                ...whether.main,
                ...whether.wind,
                ...whether.weather[0],
            });
        }

        getCurrentLocation();
    }, []);

    const isGoodWeather =
        weather &&
        weather.main !== 'Rain' &&
        weather.temp > 17 &&
        weather.temp < 25 &&
        weather.speed < 8;

    let text = <Text>Загружаем...</Text>;
    if (errorMsg) {
        text = <Text>{errorMsg}</Text>;
    } else if (weather) {
        text = (
            <View style={{ alignItems: 'flex-start' }}>
                <Text>Широта: {weather?.latitude}</Text>
                <Text>Долгота: {weather?.longitude}</Text>
                <Text>Температура: {Math.round(weather?.temp)} °C</Text>
                <Text>Скорость ветра: {weather?.speed} м/с</Text>
                <Text>Влажность: {weather?.humidity}%</Text>
                <Text>Давление: {weather?.pressure}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Text
                    style={{
                        ...generalStyles.font,
                        alignContent: 'flex-start',
                        fontWeight: 500,
                        marginBottom: 15,
                    }}
                >
                    Погода
                </Text>
                <Image
                    source={weather?.main === 'Rain'? icons.rain
                        : weather?.main === 'Clear'? icons.sun
                        : icons.weather}
                    style={{ width: 50, height: 50, marginRight: 20}}
                />
            </View>
            <>{text}</>
            {isGoodWeather && (
                <Text style={styles.recommendation}>
                    Самое время для медитации на свежем воздухе!
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    recommendation: {
        backgroundColor: '#f3f2ce',
        borderRadius: 10,
        padding: 10,
        width: '95%',
        marginTop: 15,
        textAlign: 'center',
        marginHorizontal: 'auto',
    },
});
