import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {globalStyles, colors} from "@/theme/styles";

export default function Inbox() {
    const [activeTab, setActiveTab] = useState('messages');

    const MessagesContent = () => (
        <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Messages Content</Text>
        </View>
    );

    const NotificationsContent = () => (
        <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Notifications Content</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Toggle Header */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        activeTab === 'messages' && styles.activeToggle
                    ]}
                    onPress={() => setActiveTab('messages')}
                >
                    <Text style={[
                        styles.toggleText,
                        activeTab === 'messages' && styles.activeText
                    ]}>
                        Messages
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        activeTab === 'notifications' && styles.activeToggle
                    ]}
                    onPress={() => setActiveTab('notifications')}
                >
                    <Text style={[
                        styles.toggleText,
                        activeTab === 'notifications' && styles.activeText
                    ]}>
                        Notifications
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content Area */}
            {activeTab === 'messages' ? <MessagesContent /> : <NotificationsContent />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    toggleContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        paddingHorizontal: 16,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeToggle: {
        borderBottomColor: colors.primary,
    },
    toggleText: {
        fontSize: 16,
        color: '#666',
    },
    activeText: {
        color: colors.primary,
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    contentText: {
        fontSize: 16,
    }
});