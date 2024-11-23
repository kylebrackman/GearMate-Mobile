import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity, Modal} from 'react-native';
import {globalStyles, colors} from "@/theme/styles";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import ItemLocation from "./map/ItemLocation";

const ListItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemCondition, setItemCondition] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const itemTypes = [
        "Hardware",
        "Winter Sport",
        "Sport (General)",
        "Water Sport",
        "Fishing",
        "Camping",
        "Beach",
        "Climb",
        "Outdoor Game"
    ];

    const conditions = [
        "New",
        "Like New",
        "Light Use",
        "Medium Use",
        "Heavy Use"
    ];

    // Best way to consolidate this function into one place? ie: also used exactly the same in login page
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            // mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={globalStyles.authContainer}>
                <Text style={styles.title}>List Your Item</Text>

                <TextInput
                    style={globalStyles.standardInput}
                    placeholder="Item Name *"
                    value={itemName}
                    onChangeText={setItemName}
                />

                <TextInput
                    style={globalStyles.standardInput}
                    placeholder="Price *"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />

                <TextInput
                    style={[globalStyles.standardInput, styles.multilineInput]}
                    placeholder="Description *"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                />
                <View style={styles.pickerRow}>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerLabel}>Type *</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setItemType(value)}
                            items={
                                itemTypes.map((type) => ({
                                    label: type,
                                    value: type,
                                }))
                            }
                        />
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerLabel}>Condition *</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setItemCondition(value)}
                            items={
                                conditions.map((condition) => ({
                                    label: condition,
                                    value: condition,
                                }))
                            }
                        />
                    </View>
                </View>


                <View>
                    <Button title="Pick an image from camera roll" onPress={pickImage}/>
                    {image && <Image source={{uri: image}}/>}
                </View>

                <TouchableOpacity
                    onPress={toggleModal}
                    style={globalStyles.authButton}
                >
                    <Text style={globalStyles.buttonText}>Next</Text>
                </TouchableOpacity>
                <Modal visible={isModalVisible} animationType="slide" >
                    <ItemLocation toggleModal={toggleModal}/>
                </Modal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    multilineInput: {
        height: 100,
        paddingTop: 10,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        marginBottom: 15,

    },
    pickerLabel: {
        fontSize: 18,           // Slightly larger font size for emphasis
        fontWeight: 'bold',     // Bold text for better visibility
        color: colors.primary,  // Use the primary color for consistency
        marginBottom: 8,        // Space between the label and the picker
        letterSpacing: 0.5,     // Add slight spacing between letters
    },
    picker: {
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        marginBottom: 10,
    },
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },


});

export default ListItemForm;