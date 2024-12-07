import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {Href, usePathname, useRouter} from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles, colors } from "@/theme/styles";

const tabs = [
    {
        name: "explore",
        icon: "search1",
        label: "Explore",
        visible: true,
    },
    {
        name: "listGear",
        icon: "plus",
        label: "List",
        visible: true
    },
    {
        name: "messages",
        icon: "message1",
        label: "Messages",
        visible: true,
    },
    {
        name: "profile",
        icon: "user",
        label: "Profile",
        visible: true
    },
];
type AntDesignIconName = "search1" | "plus" | "message1" | "user";
export default function TabBar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleTabPress = (tabName: string) => {
        if (!pathname.startsWith(`/${tabName}`)) {
            router.replace(`/${tabName}` as Href<`/${string}`>);
        }
    };

    return (
        <View style={styles.tabBar}>
            {tabs
                .map((tab) => (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => handleTabPress(tab.name)}
                        style={[
                            styles.tab,
                            pathname.startsWith(`/${tab.name}`) && styles.activeTab,
                        ]}
                    >
                        <AntDesign
                            name={tab.icon as AntDesignIconName}
                            size={26}
                            color={pathname.startsWith(`/${tab.name}`) ? colors.primary : colors.secondary}
                        />
                        <Text
                            style={{
                                color: pathname.startsWith(`/${tab.name}`) ? colors.primary : colors.secondary,
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
    },
});
