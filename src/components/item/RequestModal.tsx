import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {globalStyles} from "@/theme/styles";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

interface RequestModalProps {
    toggleModal: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({toggleModal}) => {
    const [date, setDate] = useState(dayjs());
    const [open, setOpen] = useState(false)

    return (
        <View style={[globalStyles.container, styles.padding20]}>
            <TouchableOpacity onPress={toggleModal}>
                <Text>Back</Text>
            </TouchableOpacity>
            <Text>RequestModal</Text>
            <View style={styles.dateContainer}>
                <DateTimePicker
                    mode="range"
                    date={date}
                    onChange={(params) => setDate(params.date)}
                />
            </View>
        </View>
    )
}

export default RequestModal

const styles = StyleSheet.create({
    padding20: {
        padding: 20
    },
    dateContainer: {
        marginBottom: 20,
        padding: 20
    }
})