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
            router.replace("/explore");
        }
    }, [user, segments]);

    return (
        <Tabs
            tabBar={(props) => <TabBar />}
            screenOptions={{
                tabBarStyle: {
                    height: 45,
                    paddingBottom: 5,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarLabel: "Explore",
                }}
            />
            <Tabs.Screen
                name="messages"
                options={{
                    title: "Messages",
                    tabBarLabel: "Messages",
                }}
            />
            <Tabs.Screen
                name="listGear"
                options={{
                    title: "List Gear",
                    tabBarLabel: "List",
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarLabel: "Profile",
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
