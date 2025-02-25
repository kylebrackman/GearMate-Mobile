import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, Modal} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import {colors, globalStyles} from "@/theme/styles";
import {StyleSheet} from "react-native";
import RequestCard from "@/src/components/item/RequestCard";
import dayjs from "dayjs";

export default function ItemDetails() {
    const {firebaseId} = useLocalSearchParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [startingDay, setStartingDay] = useState<dayjs.Dayjs | null>(null);
    const [endingDay, setEndingDay] = useState<dayjs.Dayjs | null>(null);


    const item = {
        id: 1,
        name: 'Mountain Bike',
        image: require('@/assets/images/item/mountain-bike.png'),
        description: 'Great for off-road trails',
        price: 25,
        condition: 'New',
        location: "Boulder, CO"
    }
    // TODO: need to now make a fetch call to get the item by id and load this page
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    useEffect(() => {
        console.log("Start Date:", startingDay);
        console.log("End Date:", endingDay);
    }, [startingDay, endingDay]);




    return (
        <ScrollView style={globalStyles.container}>
            <Image
                style={styles.itemImage}
                source={item.image}
            />
            <View style={styles.itemInfoSection}>
                <Text style={globalStyles.headerSecondary}>{item.name}</Text>
                <Text style={styles.itemLocation}>{item.location}</Text>
                <Text style={styles.itemDetails}>{item.description}</Text>
            </View>

            <View style={styles.itemInfoSection}>
                <View style={styles.itemRatingRow}>
                    <Text style={styles.itemRating}>Rating</Text>
                    <TouchableOpacity>
                        <Text style={styles.itemReviews}>Reviews</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.itemHostSection}>
                <View>
                    <Text style={styles.itemHostName}>Owned by OWNER</Text>
                </View>
            </View>
            <View style={styles.itemFooter}>
                <Text style={styles.itemPrice}> ${item.price} / <Text
                    style={styles.itemPricePerNight}>day</Text></Text>
                <TouchableOpacity onPress={toggleModal} style={[styles.authButton, styles.buttonHorizontalPadding]}>
                    <Text style={globalStyles.buttonText}>Request</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={isModalVisible} presentationStyle={"formSheet"} animationType={"slide"}>
                <RequestCard
                    toggleModal={toggleModal}
                    startingDay={startingDay}
                    endingDay={endingDay}
                    setEndingDay={setEndingDay}
                    setStartingDay={setStartingDay}
                />
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonHorizontalPadding: {
        paddingHorizontal: 20
    },
    itemImage: {
        width: '100%',
        height: 300,
    },
    itemInfoSection: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    itemLocation: {
        fontSize: 16,
        color: 'gray',
        marginTop: 4,
    },
    itemDetails: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
    },
    itemRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    itemRating: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemReviews: {
        marginLeft: 10,
        color: '#3498db',
        fontSize: 12,
    },
    itemAlertContainer: {
        backgroundColor: '#fdecea',
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    itemHostSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    itemHostImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    itemHostName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemHostInfo: {
        fontSize: 14,
        color: 'gray',
    },
    itemFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemPricePerNight: {
        fontSize: 14,
        color: 'gray',
    },
    itemRequestButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    itemRequestButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    authButton: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
});
