import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import icons from '@/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton/CustomButton';

export default function App() {
    const [fontsLoaded] = useFonts({
        WorkSans: require('../assets/fonts/WorkSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <></>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoView}>
                <Image
                    source={icons.logo}
                    style={styles.logo}
                />
                <Text style={styles.title}>MoodiNest</Text>
            </View>
            <CustomButton
                showText="Перейти в приложение"
                onPress={() => router.navigate('/main')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    logoView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 100,
    },
    title: {
        fontFamily: 'Work-Sans',
        flexDirection: 'row',
        fontSize: 50,
    },
});
