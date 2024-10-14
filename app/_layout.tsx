import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="(app)/suggestions"
                options={{ headerTitle: '' }}
            />
            <Stack.Screen
                name="(app)/meditation-card/[id]"
                options={{ headerTitle: '' }}
            />
        </Stack>
    );
}
