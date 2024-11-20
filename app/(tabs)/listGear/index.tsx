import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { globalStyles } from "@/theme/styles";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

const ListItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemCondition, setItemCondition] = useState('');
    const [image, setImage] = useState<string | null>(null);

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

    const handleSubmit = () => {
        // Handle form submission
        console.log({
            itemName,
            price,
            description,
            itemType,
            itemCondition,
            image
        });
    };


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

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Item Type *</Text>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                    />
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Item Condition *</Text>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                    />
                </View>

                <View >
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} />}
                </View>

                <Button
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={!itemName || !price || !description || !itemType || !itemCondition}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
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
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    picker: {
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default ListItemForm;