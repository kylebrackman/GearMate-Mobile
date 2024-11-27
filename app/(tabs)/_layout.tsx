import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import { useAuth } from "@/context/AuthContext";

export default function TabsLayout() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Tabs
            tabBar={() => <TabBar />}
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
