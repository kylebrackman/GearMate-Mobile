import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {useAuthService} from "@/hooks/useAuthService";
import {globalStyles} from "@/theme/styles";
import {AntDesign} from "@expo/vector-icons";
import {Avatar, Card, Divider} from "@rneui/themed";
import {router} from "expo-router";

export default function ProfileScreen() {
    const {user, signOut} = useAuthService();

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <View style={globalStyles.marginTop20}>
            <View style={globalStyles.profileRow}>
                <Text style={globalStyles.header}>
                    Profile
                </Text>
                <AntDesign name="bells" size={24} color="black"/>
            </View>
            <View style={globalStyles.profileRow}>
                <Avatar size={50} title="GM" containerStyle={{backgroundColor: 'black'}} rounded/>
                <TouchableOpacity onPress={() => router.push(`/profile/details/${user?.uid}`)}>
                    <AntDesign name="arrowright" size={24} color="black"/>
                </TouchableOpacity>
            </View>
            <Divider/>
            <Card containerStyle={globalStyles.profileCard}>
                <Card.Title>List Your Gear</Card.Title>
                <Card.Divider/>
                <Text style={{textAlign: 'center'}}> Passively earn cash off your extra gear! </Text>
            </Card>
            <View style={globalStyles.settingsView}>
                <Text style={[globalStyles.headerSecondary, globalStyles.bottomMargin10]}>
                    Settings
                </Text>
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
