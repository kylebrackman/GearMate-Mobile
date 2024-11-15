import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {useAuthService} from "@/hooks/useAuthService";

export default function ProfileScreen() {
    const { user, signOut } = useAuthService();

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    logoutButton: {
        backgroundColor: '#ff3b30', // iOS red color
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 'auto', // This will push the button to the bottom
        marginBottom: 20,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
