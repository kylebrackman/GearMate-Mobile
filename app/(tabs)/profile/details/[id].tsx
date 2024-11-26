import {View, Text} from 'react-native'
import {globalStyles} from '@/theme/styles';
import {Avatar, Card, Divider} from "@rneui/themed";
import {StyleSheet} from "react-native";

const profileDetails = () => {
    return (
        <View style={styles.marginTop20}>
            <Card containerStyle={styles.profileCard}>
                <Avatar size={100} title="GM" containerStyle={{backgroundColor: 'black'}} rounded/>
                <Text style={globalStyles.headerSecondary}>Name </Text>
                <Text>City, State</Text>
            </Card>
            <View style={styles.settingsView}>
                <Text style={[globalStyles.headerSecondary, styles.bottomMargin10]}>
                    Settings
                </Text>
            </View>
        </View>
    )
}

export default profileDetails

const styles = StyleSheet.create({
    settingsView: {
        marginHorizontal: 20
    },
    marginTop20: {
        marginTop: 20
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    bottomMargin10: {
        marginBottom: 10
    },
})