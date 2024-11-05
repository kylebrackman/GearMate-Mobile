import { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { UserProvider } from "../src/context/UserContext";
// import { User } from "../src/types/models.types"; // Rails user type
// import { onAuthStateChanged, User } from "firebase/auth";
// import { FIREBASE_AUTH } from "@/src/config/firebaseConfig";
import TabBar from "@/components/TabBar";

export default function RootLayout() {

  // const [user, setUser] = useState<User | null>(null);
  // Have not been able to find a way to redirect to "screens/Explore" on initial load
  const router = useRouter();
  useEffect(() => {
    // Redirect to "screens/Explore" on initial load
    router.replace("/screens/Explore");
  }, []);

  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     console.log("this is the user", user);
  //     setUser(user);
  //   })
  // })

  
  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <Tabs
          tabBar={props => <TabBar {...props} />}
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
          /> :
          <Tabs.Screen
            name="screens/Profile"
            options={{
              title: "Profile",
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
