import { Link, SplashScreen } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import icons from '@/constants/icons';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [loaded, error] = useFonts({
        'Work-Sans': require('../assets/fonts/WorkSans-Regular.ttf'),
    });
    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={icons.logo}
                    style={styles.logo}
                />
                <Text style={styles.title}>MoodiNest</Text>
            </View>
            <Text style={styles.subtitle}>Трекер настроения</Text>
            <Link href={'/main'}>Перейти в приложение</Link>
            <StatusBar
                style="light"
                animated
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 50,
    },
    title: {
        fontFamily: 'Work-Sans',
        flexDirection: 'row',
        fontSize: 50,
        fontWeight: 'bold',
    },
    subtitle: {
        fontFamily: 'Work-Sans',
        fontSize: 18,
    },
});
