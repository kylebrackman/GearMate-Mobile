import { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { UserProvider } from "../src/context/UserContext";
import { Item } from "../src/types/models.types";
import TabBar from "@/components/TabBar";

export type RootStackParamList = {
  Explore: undefined;
  ItemDetails: { item: Item };
  // Add other routes as needed
};

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
              tabBarStyle: {
                display: "none",
              }
            }}
          />
          <Tabs.Screen
            name="screens/SignUp"
            options={{
              title: "Sign Up",
              headerShown: false,
              tabBarStyle: {
                display: "none",
              }
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
