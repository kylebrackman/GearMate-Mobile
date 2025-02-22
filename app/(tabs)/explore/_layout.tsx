import { Stack } from "expo-router";

export default function ExploreLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "",
                 }}
            />
            <Stack.Screen
                name="item/[itemId]"
                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerTintColor: "#fff",
                }}
            />
            <Stack.Screen
                name="search/index"
                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerTintColor: "#fff",
                }}
            />
        </Stack>
    );
}