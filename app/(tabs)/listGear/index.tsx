import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView, Modal
} from 'react-native';
import {globalStyles, colors} from "@/theme/styles";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import {Divider} from "@rneui/themed";
import AddLocation from "@/src/components/item/AddLocation";

const ListItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemCondition, setItemCondition] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

    // Make call to backend to get the locations associated with the logged in user
    const locations = [
        "Boulder, CO",
        "Denver, CO",
        "Aspen, CO"
    ]

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
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>List Your Item</Text>
                    <Divider style={styles.divider}/>
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
                    <View style={styles.center}>
                        <TouchableOpacity onPress={pickImage} style={[styles.uploadButton, styles.width50]}>
                            <Text style={globalStyles.buttonText}>Upload Image</Text>
                        </TouchableOpacity>
                        {image && <Image source={{uri: image}} style={{width: 100, height: 100, marginTop: 10}}/>}
                    </View>
                    <View style={[styles.center, styles.locationRow]}>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerLabel}>Select a Location</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setItemType(value)}
                                items={locations.map((type) => ({
                                    label: type,
                                    value: type,
                                }))}
                            />
                        </View>
                        <Text style={{marginHorizontal: 10}}>or</Text>
                        <TouchableOpacity onPress={toggleModal} style={styles.uploadButton}>
                            <Text style={styles.uploadButtonText}>New Location</Text>
                        </TouchableOpacity>
                        {image && <Image source={{uri: image}} style={styles.imagePreview}/>}
                    </View>
                    <Modal visible={isModalVisible} onRequestClose={toggleModal} animationType={"slide"}>
                        <AddLocation toggleModal={toggleModal}/>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    multilineInput: {
        height: 100,
        paddingTop: 10,
        textAlignVertical: 'top',
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    container: {
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    uploadButton: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        width: "40%",
        marginBottom: 10
    },
    center: {
        alignItems: 'center'
    },
    locationRow: {
        flexDirection: 'row',
        marginBottom: 10
    },
    pickerContainer: {
        flex: 1,
        marginRight: 10,
    },
    pickerLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.primary,
        marginBottom: 5,
    },
    picker: {
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 8,
    },
    width50: {
        width: "50%"
    },
    divider: {
        marginBottom: 10,
        paddingBottom: 10,
    },
});

export default ListItemForm;