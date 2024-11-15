import {View, Text} from 'react-native'
import {globalStyles} from '@/theme/styles';
import {Avatar, Card, Divider} from "@rneui/themed";

const profileDetails = () => {
    return (
        <View style={globalStyles.marginTop20}>
            <Divider/>
            <Card containerStyle={globalStyles.profileCard}>
                <Avatar size={100} title="GM" containerStyle={{backgroundColor: 'black'}} rounded/>
                <Text style={globalStyles.headerSecondary}>Name </Text>
                <Text>City, State</Text>
            </Card>
            <View style={globalStyles.settingsView}>
                <Text style={[globalStyles.headerSecondary, globalStyles.bottomMargin10]}>
                    Settings
                </Text>
            </View>
        </View>
    )
}

export default profileDetails