import { Link, SplashScreen } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

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
            <Text style={styles.title}>MoodiNest</Text>
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
    title: {
        fontFamily: 'Work-Sans',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontFamily: 'Work-Sans',
        fontSize: 18,
    },
});
