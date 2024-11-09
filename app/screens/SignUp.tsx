import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../src/config/firebaseConfig';

interface SignUpScreenProps {
    closeModal: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ( { closeModal }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const auth = FIREBASE_AUTH

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
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <Text style={styles.title}>Sign Up</Text>

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

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backContainer} onPress={closeModal}>
                        <Text style={styles.back}>Back to Log in</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
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
    backContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    back: {
        color: '#1976D2',
        marginLeft: 5,
        fontWeight: 'bold',
    },
});

export default SignUpScreen;