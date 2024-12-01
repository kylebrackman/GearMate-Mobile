import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {globalStyles} from "@/theme/styles";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

interface RequestModalProps {
    toggleModal: () => void;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    setStartDate: (date: dayjs.Dayjs) => void;
    setEndDate: (date: dayjs.Dayjs) => void;
}

const RequestModal: React.FC<RequestModalProps> = ({toggleModal, startDate, endDate, setStartDate, setEndDate}) => {
    const [date, setDate] = useState(dayjs());
    const [open, setOpen] = useState(false)

    return (
        <View style={[globalStyles.container, styles.padding20]}>
            <TouchableOpacity onPress={toggleModal}>
                <Text>Back</Text>
            </TouchableOpacity>
            <View style={styles.dateContainer}>
                <DateTimePicker
                    mode="range"
                    // date={date}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={({ startDate, endDate }) => {
                        setStartDate(startDate); // Update startDate state
                        setEndDate(endDate);   // Update endDate state
                    }}
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