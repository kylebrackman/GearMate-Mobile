import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {globalStyles, colors} from "@/theme/styles";
import {Calendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import star from "react-native-ratings/src/components/Star";

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
            <View style={styles.pageContainer}>
                <Text style={globalStyles.headerSecondary}>
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
                        displayLoadingIndicator={true}
                        disableAllTouchEventsForDisabledDays={true}
                        onDayPress={handleDayPress}
                        minDate={today}
                    />
                </View>
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
        marginBottom: 20,
        padding: 20
    },
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    },
    backButton: {
        backgroundColor: colors.primary,
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
})