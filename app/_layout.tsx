import { useEffect } from "react";
import { Tabs, useRouter, useSegments } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import TabBar from "@/components/TabBar";
import { UserProvider, useUser } from "@/src/context/UserContext";

function TabsNavigator() {
    const segments = useSegments();
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";
        if (!user && !inAuthGroup) {
            router.replace("/(auth)/logIn");
        } else if (user && inAuthGroup) {
            router.replace("/explore/index");
        }
    }, [user, segments]);

    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
                tabBarStyle: {
                    height: 45,
                    paddingBottom: 5,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="explore/index"
                options={{
                    title: "Explore",
                }}
            />
            <Tabs.Screen
                name="messages/index"
                options={{
                    title: "Messages",
                }}
            />
            <Tabs.Screen
                name="profile/index"
                options={{
                    title: "Profile",
                }}
            />
            <Tabs.Screen
                name="explore/item/[id]"
                options={{
                    href: null,
                    tabBarStyle: {
                        display: "none",
                    },
                }}
            />
            <Tabs.Screen
                name="(auth)/logIn"
                options={{
                    href: null,
                    tabBarStyle: {
                        display: "none",
                    },
                }}
            />
            <Tabs.Screen
                name="(auth)/signup"
                options={{
                    href: null,
                    tabBarStyle: {
                        display: "none",
                    },
                }}
            />
        </Tabs>
    );
}

export default function RootLayout() {
    return (
        <UserProvider>
            <SafeAreaView style={styles.container}>
                <TabsNavigator />
            </SafeAreaView>
        </UserProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
