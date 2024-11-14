// styles.js
import { StyleSheet } from 'react-native';

// messing around with color palettes, subject to change
export const colors = {
    primary: '#E97451',      // Copper Orange
    secondary: '#0277BD',    // Muted Blue
    accent: '#FF8C00',       // Warm Orange
    background: '#FFFFFF',   // White
    text: '#000000',         // Black for default text
    buttonText: '#FFFFFF'
};

export const globalStyles = StyleSheet.create({

    // Generic Styles
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#333',
    },
    headerBottomMargin: {
        marginBottom: 40
    },
    headerCentered: {
        textAlign: 'center',
    },
    headerSecondary: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    bottomMargin10: {
        marginBottom: 10
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 18,
        fontWeight: '600',
    },
    buttonHorizontalPadding: {
        paddingHorizontal: 20
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
    marginTop20: {
        marginTop: 20
    },
    forgotPassword: {
        alignItems: 'center',
        marginTop: 15
    },

    // Explore Page
    exploreContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },  

    // ** Auth Specific Styles Below **
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#f5f5f5',
    },
    authButton: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    signUpTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpText: {
        color: '#1976D2',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    authBackContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    authBack: {
        color: '#1976D2',
        marginLeft: 5,
        fontWeight: 'bold',
    },

    // ** Profile Specific Styles Below **
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    settingsView: {
        marginHorizontal: 20
    },
});