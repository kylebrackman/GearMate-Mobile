import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import {globalStyles, colors} from "@/theme/styles";
import {Calendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';

interface RequestModalProps {
    toggleModal: () => void;
    startingDay: dayjs.Dayjs | null;
    endingDay: dayjs.Dayjs | null;
    // Review this React.Dispatch typing below...
    setStartingDay: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
    setEndingDay: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
}

const RequestCard: React.FC<RequestModalProps> = ({
                                                      toggleModal,
                                                      startingDay,
                                                      endingDay,
                                                      setStartingDay,
                                                      setEndingDay
                                                  }) => {


    const today = dayjs().format('YYYY-MM-DD')

    useEffect(() => {
        console.log("starting day:", startingDay?.format('YYYY-MM-DD'));
    }, [startingDay]);


    const handleDayPress = (day: any) => {
        const selectedDate = dayjs(day.dateString);
        if (startingDay && endingDay) {
            setStartingDay(selectedDate);
            setEndingDay(null);
        } else if (selectedDate.isBefore(startingDay)) {
            setStartingDay(selectedDate);
            setEndingDay(null);
        } else if (!startingDay || (endingDay && selectedDate.isBefore(startingDay))) {
            setStartingDay(selectedDate);
            setEndingDay(null); // Reset end date when starting over
        } else if (!endingDay || selectedDate.isAfter(startingDay)) {
            setEndingDay(selectedDate);
        }
    };


    return (
        <View style={[globalStyles.container, styles.padding20]}>
            <TouchableOpacity onPress={toggleModal} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View >
                <Text style={[globalStyles.headerSecondary, styles.marginTop10]}>
                    Select Your Date Range
                </Text>
                <View>
                    <Calendar
                        markingType={'period'}
                        markedDates={{
                            ...(startingDay && {
                                [startingDay.format('YYYY-MM-DD')]: {
                                    selected: true,
                                    marked: true,
                                    color: '#00aaff',
                                    startingDay: true
                                },
                            }),
                            ...(endingDay && {
                                [endingDay.format('YYYY-MM-DD')]: {
                                    selected: true,
                                    marked: true,
                                    color: '#00aaff',
                                    endingDay: true
                                },
                            }),
                        }}
                        // displayLoadingIndicator={true}
                        disableAllTouchEventsForDisabledDays={true}
                        onDayPress={handleDayPress}
                        minDate={today}
                    />
                </View>
                {/* Add section for estimated time pickup && dropoff*/}
                {/*<DateTimePicker value={date} mode="time" />*/}

                <View style={styles.infoInputContainer}>
                    <Text style={styles.inputLabel}>Any info you'd like to send to the owner?</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your message here"
                        multiline
                        numberOfLines={4}
                    />
                </View>
                <TouchableOpacity style={styles.sendRequestButton} onPress={() => console.log('Request sent!')}>
                    <Text style={styles.sendRequestButtonText}>Send Request</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RequestCard

const styles = StyleSheet.create({
    padding20: {
        padding: 20
    },
    dateContainer: {
        justifyContent: 'center',
        marginHorizontal: 10
    },
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        justifyContent: 'center',
    },
    backButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start', // Ensures the button doesn't stretch
        marginVertical: 10,     // Adds spacing around the button
    },
    backButtonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: '600',
    },
    infoInputContainer: {
        width: '100%',
        marginVertical: 20,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '500',
    },
    textInput: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: colors.primary,
        textAlignVertical: 'top',
        minHeight: 100
    },
    marginTop10: {
        marginTop: 10
    },
    sendRequestButton: {
        backgroundColor: colors.primary, // Replace with your primary color
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20, // Adds spacing above/below the button
        width: '85%', // Ensures consistent width matching other components
        alignSelf: 'center', // Centers the button horizontally
    },
    sendRequestButtonText: {
        color: colors.buttonText || '#ffffff', // Replace with your button text color
        fontSize: 18,
        fontWeight: '600',
    },
})