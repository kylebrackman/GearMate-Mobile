import React, {useState, useEffect} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import {View, StyleSheet, TouchableOpacity, Text, Platform, SafeAreaView} from 'react-native';
import * as Location from 'expo-location';
import {colors} from '@/theme/styles';

interface AddLocationProps {
    toggleModal: () => void
}

const AddLocation: React.FC<AddLocationProps> = ({
                                                      toggleModal
                                                 }) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);

    // useEffect(() => {
    //     // Request location permissions when component mounts
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             setErrorMsg('Permission to access location was denied');
    //             return;
    //         }
    //     })();
    // }, []);

    const getLocation = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        } catch (error) {
            setErrorMsg('Error getting location');
            console.error(error);
        }
    };

    const initialRegion = {
        latitude: location?.coords.latitude || 27.9881,
        longitude: location?.coords.longitude || 86.9250,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                {/*<GooglePlacesAutocomplete*/}
                {/*    placeholder="Search location"*/}
                {/*    onPress={(data, details = null) => {*/}
                {/*        console.log(data, details);*/}
                {/*    }}*/}
                {/*    query={{*/}
                {/*        key: 'YOUR_API_KEY',*/}
                {/*        language: 'en',*/}
                {/*    }}*/}
                {/*    styles={{*/}
                {/*        container: styles.autocompleteContainer,*/}
                {/*        textInput: styles.autocompleteInput,*/}
                {/*    }}*/}
                {/*/>*/}

                <TouchableOpacity onPress={getLocation} style={styles.locationButton}>
                    <Text style={styles.buttonText}>Use Current Location</Text>
                </TouchableOpacity>

                {Platform.select({
                    ios: (
                        <MapView
                            style={styles.map}
                            initialRegion={initialRegion}
                            onMapReady={() => setIsMapReady(true)}
                            showsUserLocation={true}
                        />
                    ),
                    android: isMapReady ? (
                        <MapView
                            style={styles.map}
                            initialRegion={initialRegion}
                            showsUserLocation={true}
                        />
                    ) : null,
                })}
                <TouchableOpacity onPress={toggleModal} style={styles.locationButton}>
                    <Text style={styles.buttonText}>Save and Close</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    map: {
        width: '100%',
        height: 500,
        borderRadius: 10,
        marginVertical: 16,
    },
    locationButton: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    autocompleteContainer: {
        flex: 0,
        zIndex: 1,
    },
    autocompleteInput: {
        fontSize: 16,
    },
});

export default AddLocation;