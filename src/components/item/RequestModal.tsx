import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {globalStyles} from "@/theme/styles";

interface RequestModalProps {
    toggleModal: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({toggleModal}) => {

    return (
        <View style={[globalStyles.container, styles.padding20]}>
            <TouchableOpacity onPress={toggleModal}>
                <Text>Back</Text>
            </TouchableOpacity>
            <Text>RequestModal</Text>
        </View>
    )
}

export default RequestModal

const styles = StyleSheet.create({
    padding20: {
        padding: 20
    }
})