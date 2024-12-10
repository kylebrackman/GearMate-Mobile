import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import {useAuthService} from "@/hooks/useAuthService";
import {globalStyles} from "@/theme/styles";
import {AntDesign} from "@expo/vector-icons";
import {Avatar, Card, Divider} from "@rneui/themed";
import {router} from "expo-router";
import SettingsList from "../../../src/components/user/nav/SettingsList";
import Support from "../../../src/components/user/nav/Support";
import Legal from "../../../src/components/user/nav/Legal";

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
        <ScrollView style={[styles.marginTop20, styles.marginHorizontal]} showsVerticalScrollIndicator={false}>
            <View style={styles.headerRow}>
                <Text style={globalStyles.header}>
                    Profile
                </Text>
                <AntDesign name="bells" size={24} color="black"/>
            </View>
            <View style={styles.headerRow}>
                <Avatar size={50} title="GM" containerStyle={{backgroundColor: 'black'}} rounded/>
                <TouchableOpacity onPress={() => router.push(`/profile/details/${user?.uid}`)}>
                    <AntDesign name="arrowright" size={24} color="black"/>
                </TouchableOpacity>
            </View>
            <Divider/>
            <View style={styles.headerRow}>
                <Text style={[globalStyles.header, styles.gearHeader]}>
                    Your Gear
                </Text>
            </View>
            <Divider/>

            <Card containerStyle={styles.profileCard}>
                <Card.Title>List Your Gear</Card.Title>
                <Card.Divider/>
                <Text style={{textAlign: 'center'}}> Passively earn cash off your extra gear! </Text>
            </Card>
            <View >
                <SettingsList/>

            </View>
            <View>
                <Support/>
            </View>
            <View>
                <Legal/>
            </View>

            <View>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    logoutContainer: {
        alignItems: 'center',
        marginTop: 20,

    },
    logoutButton: {
        backgroundColor: 'black', // iOS red color
        paddingVertical: 10, // Adjust padding for height
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center', // Center the button
        marginBottom: 20,
        width: "50%", // Optional: Adjust width if needed
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomMargin10: {
        marginBottom: 10
    },
    marginTop20: {
        marginTop: 20
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    marginHorizontal: {
        marginHorizontal: 20
    },
    gearHeader: {
        paddingTop: 20,
    }
});
