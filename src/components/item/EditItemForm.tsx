import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import {Item} from '@/types/models.types';
import {colors, globalStyles} from '@/theme/styles';
import {Divider} from '@rneui/themed';

interface EditItemFormProps {
    item: Item;
    toggleModal: () => void;
    onSave: (editedItem: Partial<Item>) => Promise<void>;
}

const EditItemForm: React.FC<EditItemFormProps> = ({item, toggleModal, onSave}) => {
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price.toString());
    const [description, setDescription] = useState(item.description);
    const [itemType, setItemType] = useState(item.item_type || '');
    const [condition, setCondition] = useState(item.condition);
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setName(item.name);
        setPrice(item.price.toString());
        setDescription(item.description);
        setItemType(item.item_type || '');
        setCondition(item.condition);
    }, [item]);

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (!name.trim() || !price.trim() || !description.trim() || !itemType || !condition) {
                setError('Please fill in all required fields');
                setIsLoading(false);
                return;
            }

            const editedItem: Partial<Item> = {
                id: item.id,
                name,
                price: parseFloat(price),
                description,
                item_type: itemType,
                condition,
            };

            // If a new image was selected, include it in the update
            if (image) {
                // In a real app, you would handle image upload separately
                // updatedItem.image = { uri: image };
            }

            await onSave(editedItem);
            toggleModal();
        } catch (err) {
            console.error('Failed to update item:', err);
            setError('Failed to update item. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Determine image source
    const imageSource = image
        ? {uri: image}
        : typeof item.image === 'string'
            ? {uri: `http://localhost:3000${item.image}`}
            : item.image;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Your Item</Text>
                    <Divider style={styles.divider}/>

                    {error && (
                        <Text style={styles.errorText}>{error}</Text>
                    )}

                    <TextInput
                        style={globalStyles.standardInput}
                        placeholder="Item Name *"
                        value={name}
                        onChangeText={setName}
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
                                value={itemType}
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
                                onValueChange={(value) => setCondition(value)}
                                value={condition}
                                items={
                                    conditions.map((cond) => ({
                                        label: cond,
                                        value: cond,
                                    }))
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.center}>
                        {imageSource && (
                            <Image source={imageSource} style={styles.imagePreview}/>
                        )}
                        <TouchableOpacity onPress={pickImage} style={[styles.button, styles.width50]}>
                            <Text style={globalStyles.buttonText}>Update Image</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={toggleModal}
                            style={[styles.button, styles.cancelButton]}
                            disabled={isLoading}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSave}
                            style={[styles.button, styles.saveButton]}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff"/>
                            ) : (
                                <Text style={styles.buttonText}>Save Changes</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    divider: {
        marginBottom: 15,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    multilineInput: {
        height: 100,
        paddingTop: 10,
        textAlignVertical: 'top',
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
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
    center: {
        alignItems: 'center',
        marginVertical: 15,
    },
    imagePreview: {
        width: 200,
        height: 200,
        marginBottom: 15,
        borderRadius: 8,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    width50: {
        width: '50%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        width: '48%',
    },
    saveButton: {
        backgroundColor: colors.primary,
        width: '48%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditItemForm;