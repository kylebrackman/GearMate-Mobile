import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Modal } from 'react-native';
import { loginUserApi } from '../../services/apis/UserApi';
import { FIREBASE_AUTH } from "@/src/config/firebaseConfig";
import SignUpScreen from './SignUp'; // Import your SignUp component here


const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isSignUpVisible, setSignUpVisible] = useState(false); // Add state for modal visibility
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
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgotPassword}>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.signUpContainer}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => setSignUpVisible(true)}>
                        <Text style={styles.signUp}>Sign Up!</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#1976D2',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    forgotPassword: {
        marginTop: 20,
        alignItems: 'center',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUp: {
        color: '#1976D2',
        marginLeft: 5,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
