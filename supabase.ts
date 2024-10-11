import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.EXPO_PUBLIC_API_URL!,
    process.env.EXPO_PUBLIC_API_KEY!
    // {
    //     auth: {
    //         storage: AsyncStorage,
    //         autoRefreshToken: true,
    //         persistSession: true,
    //         detectSessionInUrl: false,
    //     },
    // }
);

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});
