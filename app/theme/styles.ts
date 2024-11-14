// styles.js
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#E97451',      // Forest Green
  secondary: '#0277BD',    // Muted Blue
  accent: '#FF8C00',       // Warm Orange
  background: '#FFFFFF',   // White
  text: '#000000',         // Black for default text
  buttonText: '#FFFFFF'
};

export const globalStyles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
    },
    titleCentered: {
        textAlign: 'center',
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
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
    forgotPassword: {
        alignItems: 'center',
        marginTop: 15
    },
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#f5f5f5',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpText: {
        color: '#1976D2',
        marginLeft: 5,
        fontWeight: 'bold',
    },
});

