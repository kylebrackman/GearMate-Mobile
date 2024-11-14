import { View, Text, StyleSheet } from 'react-native'
import { Card, Button, Icon, Avatar, Divider } from '@rneui/themed';
import { AntDesign } from "@expo/vector-icons";

export default function ProfileScreen() {
    return (
        <View style={styles.main}>
            <View style={styles.profileRow}>
                <Text style={styles.profileHeader}>
                    Profile
                </Text>
                <AntDesign name="bells" size={24} color="black" />
            </View>
            <View style={styles.profileRow}>
                <Avatar size={50} title="GM" containerStyle={{ backgroundColor: 'black' }} rounded />
                <AntDesign name="arrowright" size={24} color="black" />
            </View>
            <Divider />
            <Card containerStyle={styles.card}>
                <Card.Title >List Your Gear</Card.Title>
                <Card.Divider />
                <Text style={{ textAlign: 'center' }}> Passively earn cash off your extra gear! </Text>
            </Card>
            <View style={styles.settingsView}>
                <Text style={styles.settingsHeader}>
                    Settings
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
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
    main: {
        marginTop: 20
    },
    profileHeader: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10
    },
    settingsView: {
        marginHorizontal: 20
    },
    settingsHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10
    }
});