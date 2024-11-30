import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {globalStyles} from "@/theme/styles";
import DatePicker from "react-native-date-picker";

interface RequestModalProps {
    toggleModal: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({toggleModal}) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <View style={[globalStyles.container, styles.padding20]}>
            <TouchableOpacity onPress={toggleModal}>
                <Text>Back</Text>
            </TouchableOpacity>
            <Text>RequestModal</Text>
            <DatePicker
                mode="date"
                open={open}
                date={date}
            />
        </View>
    )
}

export default RequestModal

const styles = StyleSheet.create({
    padding20: {
        padding: 20
    }
})