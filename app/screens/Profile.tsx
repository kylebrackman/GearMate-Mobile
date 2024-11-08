import { View, Text, TouchableOpacity } from 'react-native'
import { logoutUserApi } from '../../services/apis/UserApi';
import { FIREBASE_AUTH } from "@/src/config/firebaseConfig";

const Profile = () => {

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

export default Profile