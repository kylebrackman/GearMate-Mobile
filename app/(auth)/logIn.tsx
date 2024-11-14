import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal } from 'react-native';
import { loginUserApi } from '../../services/apis/UserApi';
import { FIREBASE_AUTH } from "@/src/config/firebaseConfig";
import { globalStyles } from '../theme/styles';
import SignUpScreen from './signup';

export default function LoginScreen() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isSignUpVisible, setSignUpVisible] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
        } else {
            try {
                setLoading(true);
                const response = await loginUserApi(auth, email, password);
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
        <View style={globalStyles.authContainer}>
            <KeyboardAvoidingView behavior="padding">
                <Text style={[globalStyles.title, globalStyles.titleCentered]}>Login</Text>
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

                <TouchableOpacity style={globalStyles.authButton} onPress={handleLogin}>
                    <Text style={globalStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.forgotPassword}>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={globalStyles.signUpContainer}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => setSignUpVisible(true)}>
                        <Text style={globalStyles.signUpText}>Sign Up!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {/* SignUp Modal */}
            <Modal
                visible={isSignUpVisible}
                // transparent={true}
                animationType="slide"
                presentationStyle='fullScreen'
                onRequestClose={() => setSignUpVisible(false)} // Close modal on back button
            >
                <SignUpScreen closeModal={() => setSignUpVisible(false)} />
            </Modal>
        </View>
    );
};