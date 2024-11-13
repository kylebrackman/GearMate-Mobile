import React, {useState} from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {
    AppleAuthenticationButton,
    AppleAuthenticationButtonStyle,
    AppleAuthenticationButtonType
} from 'expo-apple-authentication';
import {OAuthProvider, signInWithCredential, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '@/src/config/firebaseConfig'
import * as AppleAuthentication from 'expo-apple-authentication'

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Email login attempted', {email, password});
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };


    const handleAppleLogin = async () => {
        try {
            setIsLoading(true);
            setError('');

            const appleCredential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if (appleCredential.identityToken) {
                console.log('Token audience check:',
                    JSON.parse(atob(appleCredential.identityToken.split('.')[1])).aud
                );

                const provider = new OAuthProvider('apple.com');

                const credential = provider.credential({
                    idToken: appleCredential.identityToken,
                });

                const c = await signInWithCredential(auth, credential);
               // TODO: need to handle how we actually manage the user now but this is working and approved
            }
        } catch (error: any) {
            console.error('Detailed error:', error);

            if (error.code === 'ERR_CANCELED') {
                setError('Sign in was canceled');
            } else if (error.code === 'auth/invalid-credential') {
                console.error('Invalid credential details:', {
                    errorCode: error.code,
                    errorMessage: error.message,
                    credential: error.credential ? {
                        providerId: error.credential.providerId,
                        signInMethod: error.credential.signInMethod
                    } : 'No credential details'
                });
                setError('Authentication failed. Please ensure Apple Sign In is properly configured.');
            } else {
                setError('Failed to sign in with Apple');
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark"/>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Sign In</Text>

                    {error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : null}

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleEmailLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#ffffff"/>
                        ) : (
                            <Text style={styles.buttonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.divider}>
                        <View style={styles.dividerLine}/>
                        <Text style={styles.dividerText}>or continue with</Text>
                        <View style={styles.dividerLine}/>
                    </View>

                    <View style={styles.socialButtons}>
                        {Platform.OS === 'ios' && (
                            <AppleAuthenticationButton
                                onPress={handleAppleLogin}
                                buttonType={AppleAuthenticationButtonType.SIGN_IN}
                                buttonStyle={AppleAuthenticationButtonStyle.BLACK}
                                style={{width: 300, height: 50}}
                                cornerRadius={10}
                            />
                        )}


                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: '#ff3b30',
        textAlign: 'center',
        marginBottom: 10,
    },
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
    socialButtons: {
        gap: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },

});

export default LoginScreen;
