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

    tabBar: {
        flexDirection: "row",
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingVertical: 10,
        justifyContent: "space-around",
        alignItems: "center",
    },
    tab: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    activeTab: {
        // Customize the style for the active tab
    },

    exploreContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },

    authContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
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
    forgotPassword: {
        alignItems: 'center',
        marginTop: 15
    },

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

    itemImage: {
        width: '100%',
        height: 300,
    },
    itemInfoSection: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    itemLocation: {
        fontSize: 16,
        color: 'gray',
        marginTop: 4,
    },
    itemDetails: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
    },
    itemRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    itemRating: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemReviews: {
        marginLeft: 10,
        color: '#3498db',
        fontSize: 12,
    },
    itemAlertContainer: {
        backgroundColor: '#fdecea',
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    itemHostSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    itemHostImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    itemHostName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemHostInfo: {
        fontSize: 14,
        color: 'gray',
    },
    itemFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemPricePerNight: {
        fontSize: 14,
        color: 'gray',
    },
    itemRequestButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    itemRequestButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    pickerLabel: {
        fontSize: 16,
        color: colors.primary, // or any color you'd like
        fontWeight: '600',     // Adjust the weight if needed
        marginBottom: 5,
    },
    pickerItem: {
        fontSize: 14,
        color: colors.text,
    },

});
