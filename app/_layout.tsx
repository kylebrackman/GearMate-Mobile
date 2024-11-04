import { Stack } from "expo-router";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import TabBar from "@/components/TabBar";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Tabs
        tabBar={props => <TabBar {...props} />}
        screenOptions={{
          tabBarStyle: {
            height: 45, // Adjust this value to control the tab bar height
            paddingBottom: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Explore",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="screens/MessagesScreen"
          options={{
            title: "Messages",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="screens/LogInScreen"
          options={{
            title: "Log In",
            headerShown: false,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
