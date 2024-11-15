import {ReactNode, useEffect, useState} from "react";
import {Navigator, Tabs, useRouter, useSegments} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, ActivityIndicator, View} from "react-native";
import {AuthProvider, useAuth} from "@/context/AuthContext";
import Slot = Navigator.Slot;

function AuthCheck({children}: { children: ReactNode }) {
    const segments = useSegments();
    const router = useRouter();
    const {user, loading} = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return;
        }

        if (loading) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (!user && !inAuthGroup) {
            router.replace("/(auth)/logIn");
        } else if (user && inAuthGroup) {
            router.replace("/explore");
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
                    <Slot />
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
