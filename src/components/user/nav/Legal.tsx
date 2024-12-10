import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign, FontAwesome} from '@expo/vector-icons';

const Legal = () => {
    const settingsOptions = [
        {
            icon: <FontAwesome name="legal" size={24} color="black"/>,
            label: 'Terms of Service',
            route: '/settings/privacy'
        },
    ];

    // const handlePress = (route) => {
    //     console.log(`Navigate to ${route}`); // Replace with navigation logic
    // };

    return (
        <View>
            <Text style={styles.header}>Legal</Text>
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

export default Legal

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
