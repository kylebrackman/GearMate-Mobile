import {View, Text} from 'react-native'
import {globalStyles} from '@/theme/styles';
import {Avatar, Card, Divider} from "@rneui/themed";
import {StyleSheet} from "react-native";

const profileDetails = () => {
    return (
        <View style={styles.marginTop20}>
            <Card containerStyle={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <Avatar size={100} title="GM" containerStyle={{backgroundColor: 'black'}} rounded/>
                    <Text style={globalStyles.headerSecondary}>Name </Text>
                    <Text>City, State</Text>
                </View>
            </Card>
            <View style={styles.settingsView}>
                <Text style={styles.aboutHeading}>
                    About
                </Text>
                <Text style={styles.aboutDescription}>
                    I am a climber, runner, and software engineer living in Colorado. I like to climb, run, and code, and upload items to GearMate to make extra cash!
                </Text>
                <Divider style={styles.divider}/>
                {/*TODO: Insert review cards*/}

                <Text style={styles.aboutHeading}>
                    What others are saying about me!
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
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    aboutHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    aboutDescription: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        textAlign: 'justify',
        marginTop: 10,
    },
    divider: {
        marginBottom: 10,
        marginTop: 20
    },
})