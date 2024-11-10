import { Stack } from "expo-router";

export default function ExploreLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="item/[id]"
                options={{
                    headerTitle: "Item Details",
                    headerShown: true,
                }}
            />
        </Stack>
    );
}
