import { View, TouchableOpacity, Text } from "react-native";
import {Href, usePathname, useRouter} from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles, colors } from "@/theme/styles";

const tabs = [
    {
        name: "explore",
        icon: "search1",
        label: "Explore",
    },
    {
        name: "listGear",
        icon: "plus",
        label: "List",
    },
    {
        name: "messages",
        icon: "message1",
        label: "Messages",
    },
    {
        name: "profile",
        icon: "user",
        label: "Profile",
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
        <View style={globalStyles.tabBar}>
            {tabs
                .map((tab) => (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => handleTabPress(tab.name)}
                        style={[
                            globalStyles.tab,
                            pathname.startsWith(`/${tab.name}`) && globalStyles.activeTab,
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