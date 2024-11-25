import react from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {StyleSheet} from "react-native";
import MapView from 'react-native-maps';

const itemLocation = ({ toggleModal }: any) => {
    return (
        <View style={styles.container}>
            <Text>Item Location</Text>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider={"google"}
            />
            <TouchableOpacity onPress={toggleModal}>
                <Text>Toggle Modal</Text>
            </TouchableOpacity>
        </View>
    )
}

export default itemLocation

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#fff',
    }
})