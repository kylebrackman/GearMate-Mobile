import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {globalStyles} from "@/theme/styles";

const ListItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemCondition, setItemCondition] = useState('');
    const [image, setImage] = useState(null);


    return (
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
                style={globalStyles.standardInput}
                placeholder="Description *"
                value={description}
                onChangeText={setDescription}
                multiline
            />



            <Button title="Submit" onPress={() => { /* Handle submit */ }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    picker: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 5,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    imageText: {
        textAlign: 'center',
        marginBottom: 15,
    },
});

export default ListItemForm;
