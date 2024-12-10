import {ReactNode, useEffect, useState} from "react";
import {Navigator, SplashScreen, Stack, Tabs, useRouter, useSegments} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, ActivityIndicator, View} from "react-native";
import {AuthProvider, useAuth} from "@/context/AuthContext";
import Slot = Navigator.Slot;

// Keep the splash screen visible while check state of auth
SplashScreen.preventAutoHideAsync();
function AuthCheck({children}: { children: ReactNode }) {
    const segments = useSegments();
    const router = useRouter();
    const {user, loading} = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Only handle navigation after mounting and when auth state is known
        if (mounted && !loading) {
            SplashScreen.hideAsync();
            const inAuthGroup = segments[0] === "(auth)";

            if (!user && !inAuthGroup) {
                router.replace("/(auth)/logIn");
            } else if (user && inAuthGroup) {
                router.replace("/explore");
            }
        }
    }, [user, segments, mounted, loading]);

    if (!mounted || loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    return <>{children}</>;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <SafeAreaView style={styles.container}>
                <AuthCheck>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </AuthCheck>
            </SafeAreaView>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
