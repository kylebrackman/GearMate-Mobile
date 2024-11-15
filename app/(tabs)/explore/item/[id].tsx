import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import {useLocalSearchParams} from "expo-router";
import {globalStyles} from "@/theme/styles";

export default function ItemScreen() {
    const { id } = useLocalSearchParams();

    const item = {
        id: 1,
        name: 'Mountain Bike',
        image: require('../../../../assets/images/item/mountain-bike.png'),
        description: 'Great for off-road trails',
        price: 25,
        condition: 'New',
        location: "Boulder, CO"
    }
    // TODO: need to now make a fetch call to get the item by id and load this page

    return (
        <ScrollView style={globalStyles.container}>
            <Image
                style={globalStyles.itemImage}
                source={item.image}
            />
            <View style={globalStyles.itemInfoSection}>
                <Text style={globalStyles.headerSecondary}>{item.name}</Text>
                <Text style={globalStyles.itemLocation}>{item.location}</Text>
                <Text style={globalStyles.itemDetails}>{item.description}</Text>
            </View>

            <View style={globalStyles.itemInfoSection}>
                <View style={globalStyles.itemRatingRow}>
                    <Text style={globalStyles.itemRating}>Rating</Text>
                    <TouchableOpacity>
                        <Text style={globalStyles.itemReviews}>Reviews</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={globalStyles.itemHostSection}>
                <View>
                    <Text style={globalStyles.itemHostName}>Owned by OWNER</Text>
                </View>
            </View>
            <View style={globalStyles.itemFooter}>
                <Text style={globalStyles.itemPrice}> ${item.price} / <Text style={globalStyles.itemPricePerNight}>day</Text></Text>
                <TouchableOpacity style={[globalStyles.authButton, globalStyles.buttonHorizontalPadding]}>
                    <Text style={globalStyles.buttonText}>Request</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
