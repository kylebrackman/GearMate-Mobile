import {View, Text, TouchableOpacity} from 'react-native'
import {FIREBASE_AUTH} from "@/src/config/firebaseConfig";
import {logoutUserApi} from "@/services/apis/UserApi";

export default function Profile() {
    const handleLogout = async () => {
        await logoutUserApi(FIREBASE_AUTH);
    };

    return (
        <View>
            <Text>Profile</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
