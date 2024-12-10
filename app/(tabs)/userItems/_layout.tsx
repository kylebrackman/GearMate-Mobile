import { Stack } from "expo-router";

export default function UserItemsLayout() {
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