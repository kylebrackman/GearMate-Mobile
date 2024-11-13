import { Stack } from "expo-router";

export default function ExploreLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    title: ""
                 }}
            />
            <Stack.Screen
                name="item/[id]"
                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerTintColor: "#fff",
                }}
            />
        </Stack>
    );
}
