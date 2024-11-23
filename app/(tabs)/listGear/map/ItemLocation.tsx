import react from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {StyleSheet} from "react-native";




const itemLocation = ({ toggleModal }: any) => {
    return (
        <View style={styles.container}>
            <Text>Item Location</Text>
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