import {Tabs} from "expo-router";
import {useAuth} from "@/context/AuthContext";
import {AntDesign} from "@expo/vector-icons";
import {colors} from "@/theme/styles";

export default function TabsLayout() {
    const {user} = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarStyle: {
                    height: 55,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                },
            }}
        >
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <AntDesign name="search1" size={24} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="listGear"
                options={{
                    title: "List",
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <AntDesign name="plus" size={24} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="messages"
                options={{
                    title: "Messages",
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <AntDesign name="message1" size={24} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <AntDesign name="user" size={24} color={color}/>
                    ),
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