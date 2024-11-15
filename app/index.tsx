import {Redirect} from 'expo-router';
import {useAuth} from '@/context/AuthContext';

export default function Index() {
    const {user} = useAuth();

    return user ? <Redirect href="/(tabs)/explore"/> : <Redirect href="/(auth)/logIn"/>;


}
