import { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { UserProvider } from "../src/context/UserContext";
import { NavigationContainer } from '@react-navigation/native';
import TabBar from "@/components/TabBar";

export default function RootLayout() {

  // Have not been able to find a way to redirect to "screens/Explore" on initial load
  const router = useRouter();
  useEffect(() => {
    router.replace("/screens/Explore");
  }, []);

  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <Tabs
          tabBar={props => <TabBar {...props} />}
          screenOptions={{
            tabBarStyle: {
              height: 45,
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
          /> :
          <Tabs.Screen
            name="screens/Profile"
            options={{
              title: "Profile",
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="screens/ItemDetails"
            options={{
              title: "Item Summary",
              headerShown: false,
            }}
          />
        </Tabs>
      </SafeAreaView>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
