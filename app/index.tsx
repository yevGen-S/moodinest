import { useFonts } from 'expo-font';
import SignIn from './(auth)/signIn';

export default function App() {
    const [fontsLoaded] = useFonts({
        WorkSans: require('../assets/fonts/WorkSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <></>;
    }

    // const [session, setSession] = useState<Session | null>(null);

    // useEffect(() => {
    //     supabase.auth.getSession().then(({ data: { session } }) => {
    //         setSession(session);
    //     });

    //     supabase.auth.onAuthStateChange((_event, session) => {
    //         setSession(session);
    //     });
    // }, []);

    return <SignIn />;
}
