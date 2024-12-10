import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

const SettingsList = () => {
    const settingsOptions = [
        {
            icon: <AntDesign name="user" size={24} color="black"/>,
            label: 'Personal information',
            route: '/settings/personal-info'
        },
        {
            icon: <AntDesign name="creditcard" size={24} color="black"/>,
            label: 'Payments and payouts',
            route: '/settings/payments'
        },
        {
            icon: <AntDesign name="lock" size={24} color="black"/>,
            label: 'Login & security',
            route: '/settings/security'
        },
        {
            icon: <AntDesign name="bells" size={24} color="black"/>,
            label: 'Notifications',
            route: '/settings/notifications'
        },
        {
            icon: <AntDesign name="sharealt" size={24} color="black"/>,
            label: 'Privacy and sharing',
            route: '/settings/privacy'
        },
    ];

    // const handlePress = (route) => {
    //     console.log(`Navigate to ${route}`); // Replace with navigation logic
    // };

    return (
        <View>
            <Text style={styles.header}>Settings</Text>
            {settingsOptions.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.optionContainer}
                    // onPress={() => handlePress(option.route)}
                >
                    <View style={styles.iconContainer}>{option.icon}</View>
                    <Text style={styles.optionText}>{option.label}</Text>
                    <AntDesign name="right" size={20} color="#ccc"/>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default SettingsList

const styles = StyleSheet.create({

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: 'black', // Default black text color
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    iconContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: 'black', // Default black text color
    },
});
