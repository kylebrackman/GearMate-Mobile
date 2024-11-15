import React from "react";
import { ScrollView, View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const itemTypes = {
    Kayak: "kayaking",
    Ski: "ski",
    Snowboard: "snowboard",
    Fishing: "fish",
    "Bike": "bike",
    Footwear: "shoe-sneaker",
    Surf: "surfing",
    Safety: "racing-helmet"
};

const ItemTypeSearch = () => {
    return (
        <ScrollView horizontal={true} style={{ marginBottom: 10 }} showsHorizontalScrollIndicator={false}>
            {Object.entries(itemTypes).map(([type, iconName]) => (
                <View key={type} style={{ flexDirection: "column", alignItems: "center", padding: 10 }}>
                    <MaterialCommunityIcons name={iconName} size={24} style={{ marginRight: 10 }} />
                    <Text>{type}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

export default ItemTypeSearch;
