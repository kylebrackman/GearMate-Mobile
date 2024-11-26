import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from "@/src/config/firebaseConfig";
import {colors, globalStyles} from '@/theme/styles';
import {useAuthService} from "@/hooks/useAuthService";
import {
    AppleAuthenticationButton,
    AppleAuthenticationButtonStyle,
    AppleAuthenticationButtonType
} from "expo-apple-authentication";

interface SignUpScreenProps {
    closeModal: () => void;
}

export default function SignUpScreen({ toggleModal }: any) { //TODO: clean up the args
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const auth = FIREBASE_AUTH
    const authService = useAuthService();

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
        } else {
            try {
                setLoading(true);
                const response = await createUserWithEmailAndPassword(auth, email, password);
                console.log(response);
                Alert.alert("Check Email!");
            } catch (error: any) {
                Alert.alert("Login failed:", error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.authContainer}>
            <KeyboardAvoidingView behavior="padding">
                <Text style={[globalStyles.header, styles.headerCentered, styles.headerBottomMargin]}>Sign up</Text>

                <TextInput
                    style={globalStyles.standardInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={globalStyles.standardInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TextInput
                    style={globalStyles.standardInput}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.authButton} onPress={handleSignUp}>
                    <Text style={globalStyles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.authBackContainer} onPress={toggleModal}>
                    <Text style={styles.authBack}>Back to Log in</Text>
                </TouchableOpacity>
                <View style={styles.divider}>
                    <View style={styles.dividerLine}/>
                    <Text style={styles.dividerText}>or continue with</Text>
                    <View style={styles.dividerLine}/>
                </View>
                <View >
                    {Platform.OS === 'ios' && (
                        <AppleAuthenticationButton
                            // onPress={handleAppleLogin}
                            buttonType={AppleAuthenticationButtonType.SIGN_UP}
                            buttonStyle={AppleAuthenticationButtonStyle.BLACK}
                            style={{width: 300, height: 50}}
                            cornerRadius={10}
                        />
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5E5',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#6B7280',
    },
    authButton: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    signUpTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpText: {
        color: '#1976D2',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    authBackContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    authBack: {
        color: '#1976D2',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    forgotPassword: {
        alignItems: 'center',
        marginTop: 15
    },
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    headerCentered: {
        textAlign: 'center',
    },
    headerBottomMargin: {
        marginBottom: 40
    },
});