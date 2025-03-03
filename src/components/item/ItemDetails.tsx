import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert} from 'react-native';
import {colors, globalStyles} from "@/theme/styles";
import {StyleSheet} from "react-native";
import RequestCard from "@/src/components/item/RequestCard";
import EditItemForm from "@/src/components/item/EditItemForm";
import dayjs from "dayjs";
import {getItemApi, editItemApi} from "@/services/apis/ItemApi";
import {Item} from "@/types/models.types";
import {useAuth} from "@/context/AuthContext";
import {getUserApi} from "@/services/apis/UserApi";

type ItemDetailsProps = {
    itemId: string | string[];
    forceOwnerView?: boolean;
};

export default function ItemDetails({ itemId, forceOwnerView = false }: ItemDetailsProps): JSX.Element {
    const {user} = useAuth(); // Get Firebase auth user
    const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [startingDay, setStartingDay] = useState<dayjs.Dayjs | null>(null);
    const [endingDay, setEndingDay] = useState<dayjs.Dayjs | null>(null);
    const [item, setItem] = useState<Item | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        fetchItemData();
    }, [itemId, user]);

    const fetchItemData = async () => {
        setIsLoading(true);
        try {
            // Fetch item data
            const fetchedItem = await getItemApi(Number(itemId));
            if (!fetchedItem) {
                setErrors(["Failed to fetch item"]);
                return;
            }

            setItem(fetchedItem);

            // Check if current user is the owner
            if (user && user.uid) {
                const gearMateUser = await getUserApi(user.uid);
                if (gearMateUser && gearMateUser.id === fetchedItem.owner_id) {
                    setIsOwner(true);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setErrors(["Error fetching item details"]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleRequestModal = () => {
        setIsRequestModalVisible(!isRequestModalVisible);
    };

    const toggleEditModal = () => {
        setIsEditModalVisible(!isEditModalVisible);
    };

    const handleEditItem = async (editedItem: Partial<Item>) => {
        try {
            const updatedItem = await editItemApi({
                id: editedItem.id,
                name: editedItem.name,
                description: editedItem.description,
                price: editedItem.price,
                condition: editedItem.condition,
            });
            const newItem = updatedItem;
            console.log(newItem);
            setItem(newItem);
        } catch (error: unknown) {
            console.error('Error editing item:', error);
            throw error;
        }
    };

    // Loading state check
    if (isLoading) {
        return (
            <View style={[globalStyles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading item details...</Text>
            </View>
        );
    }

    // Error state check
    if (errors.length > 0 || !item) {
        return (
            <View style={[globalStyles.container, styles.errorContainer]}>
                <Text style={styles.errorText}>{errors.join(", ") || "Item not found"}</Text>
            </View>
        );
    }

    // Determine image source based on item.image (might be a uri or a local image)
    const imageSource = typeof item.image === 'string'
        ? { uri: `http://localhost:3000${item.image}` }
        : item.image;

    return (
        <ScrollView style={globalStyles.container}>
            <Image
                style={styles.itemImage}
                source={imageSource}
            />
            <View style={styles.itemInfoSection}>
                <Text style={globalStyles.headerSecondary}>{item.name}</Text>
                <Text style={styles.itemLocation}>
                    {item.location ? item.location.address : "Location not specified"}
                </Text>
                <Text style={styles.itemDetails}>{item.description}</Text>
            </View>

            <View style={styles.itemInfoSection}>
                <View style={styles.itemRatingRow}>
                    <Text style={styles.itemRating}>Rating: {item.rating || "No ratings yet"}</Text>
                    <TouchableOpacity>
                        <Text style={styles.itemReviews}>Reviews</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.itemHostSection}>
                <View>
                    {isOwner ? (
                        <Text style={styles.itemHostName}>You own this item</Text>
                    ) : (
                        <Text style={styles.itemHostName}>
                            Owned by {item.owner_first_name || "Owner"}
                        </Text>
                    )}
                </View>
            </View>

            <View style={styles.itemFooter}>
                <Text style={styles.itemPrice}>${item.price} / <Text
                    style={styles.itemPricePerNight}>day</Text></Text>

                {isOwner ? (
                    // Owner actions
                    <View style={styles.ownerActionContainer}>
                        <TouchableOpacity onPress={toggleEditModal} style={[styles.authButton, styles.buttonHorizontalPadding]}>
                            <Text style={globalStyles.buttonText}>Edit Item</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.authButton, styles.buttonHorizontalPadding, styles.marginTop10]}>
                            <Text style={globalStyles.buttonText}>View Requests</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Renter actions
                    <TouchableOpacity onPress={toggleRequestModal} style={[styles.authButton, styles.buttonHorizontalPadding]}>
                        <Text style={globalStyles.buttonText}>Request Item</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Request Modal */}
            {!isOwner && (
                <Modal visible={isRequestModalVisible} presentationStyle={"formSheet"} animationType={"slide"}>
                    <RequestCard
                        toggleModal={toggleRequestModal}
                        startingDay={startingDay}
                        endingDay={endingDay}
                        setEndingDay={setEndingDay}
                        setStartingDay={setStartingDay}
                    />
                </Modal>
            )}

            {/* Edit Modal */}
            {isOwner && (
                <Modal visible={isEditModalVisible} presentationStyle={"formSheet"} animationType={"slide"}>
                    <EditItemForm
                        item={item}
                        toggleModal={toggleEditModal}
                        onSave={handleEditItem}
                    />
                </Modal>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonHorizontalPadding: {
        paddingHorizontal: 20
    },
    marginTop10: {
        marginTop: 10
    },
    ownerActionContainer: {
        width: '50%'
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});