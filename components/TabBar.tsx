import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { usePathname } from "expo-router";
export default function TabBar({navigation}: any) { // TODO: fix prop
    const pathname = usePathname();

    const tabs = [
        {
            name: "explore/index",
            // icon: "search1",
            label: "Explore",
            visible: true,
        },
        {
            name: "messages/index",
            // icon: "message1",
            label: "Messages",
            visible: true,
        },
        {
            name: "profile/index",
            // icon: "user",
            label: "Profile",
            // visible: Boolean(idToken),
        },
        {
            name: "(auth)/login",
            // icon: "user",
            label: "Log In",
            // visible: !idToken,
        },
    ];

    return (
        <View style={styles.tabBar}>
            {tabs
                .filter((tab) => tab.visible)
                .map((tab) => (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => navigation.navigate(tab.name)}
                        style={[
                            styles.tab,
                            pathname.startsWith(`/${tab.name}`) && styles.activeTab,
                        ]}
                    >
                        {/*<AntDesign*/}
                        {/*    name={tab.icon}*/}
                        {/*    size={26}*/}
                        {/*    color={pathname.startsWith(`/${tab.name}`) ? "#1976D2" : "#696969"}*/}
                        {/*/>*/}
                        <Text
                            style={{
                                color: pathname.startsWith(`/${tab.name}`) ? "#1976D2" : "#696969",
                            }}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingVertical: 10,
        justifyContent: "space-around",
        alignItems: "center",
    },
    tab: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    activeTab: {
        // Customize the style for the active tab, e.g., adding a border or changing the background color
    },
});
