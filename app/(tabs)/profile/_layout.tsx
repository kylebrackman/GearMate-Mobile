import {Stack} from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "",
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="userItems/index"
                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerTintColor: "black",
                }}
            />
            <Stack.Screen
                name="userItems/item/[itemId]"
                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerTintColor: "black",
                }}
            />
        </Stack>
    );
}