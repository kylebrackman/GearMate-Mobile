import { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import TabBar from "@/components/TabBar";

export default function RootLayout() {

  // Have not been able to find a way to redirect to "screens/Explore" on initial load
  const router = useRouter();
  useEffect(() => {
    // Redirect to "screens/Explore" on initial load
    router.replace("/screens/Explore");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Tabs
        tabBar={props => <TabBar {...props} />}
        initialRouteName="screens/Explore"
        screenOptions={{
          tabBarStyle: {
            height: 45, // Adjust this value to control the tab bar height
            paddingBottom: 5,
          }
        }}
        
      >
        <Tabs.Screen
          name="screens/Explore"
          options={{
            title: "Explore",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="screens/Messages"
          options={{
            title: "Messages",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="screens/LogIn"
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
