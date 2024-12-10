import {Tabs} from "expo-router";
import {useAuth} from "@/context/AuthContext";

export default function TabsLayout() {
    const {user} = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Tabs>
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="listGear"
                options={{
                    title: "List",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="messages"
                options={{
                    title: "Messages",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    href: null
                }}
            />
        </Tabs>
    );
}
