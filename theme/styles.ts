import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#E97451',
    secondary: '#696969',
    accent: '#FF8C00',
    background: '#FFFFFF',
    text: '#000000',
    buttonText: '#FFFFFF'
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#333',
    },
    headerSecondary: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 18,
        fontWeight: '600',
    },
    standardInput: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
});
