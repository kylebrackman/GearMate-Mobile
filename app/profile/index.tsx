import { View, Text, TouchableOpacity } from 'react-native'
import { Card, Avatar, Divider } from '@rneui/themed';
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from '../../theme/styles';
import { useRouter } from "expo-router";

export default function ProfileScreen() {
    const router = useRouter();
    return (
        <View style={globalStyles.marginTop20}>
            <View style={globalStyles.profileRow}>
                <Text style={globalStyles.header}>
                    Profile
                </Text>
                <AntDesign name="bells" size={24} color="black" />
            </View>
            <View style={globalStyles.profileRow}>
                <Avatar size={50} title="GM" containerStyle={{ backgroundColor: 'black' }} rounded />
                <TouchableOpacity onPress={() => router.push(`/profile/details/profileDetails`)}>
                    <AntDesign name="arrowright" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Divider />
            <Card containerStyle={globalStyles.profileCard}>
                <Card.Title >List Your Gear</Card.Title>
                <Card.Divider />
                <Text style={{ textAlign: 'center' }}> Passively earn cash off your extra gear! </Text>
            </Card>
            <View style={globalStyles.settingsView}>
                <Text style={[globalStyles.headerSecondary, globalStyles.bottomMargin10]}>
                    Settings
                </Text>
            </View>
        </View>
    )
}