import {Stack} from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: ""
                }}
            />
            <Stack.Screen
                name="userItems"
                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerTintColor: "black",
                }}
            />
        </Stack>
    );
}