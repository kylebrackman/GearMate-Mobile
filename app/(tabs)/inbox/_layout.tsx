import { Stack } from "expo-router";

export default function MessageLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="Inbox"
                // options={{ headerShown: true }}
            />

        </Stack>
    );
}
