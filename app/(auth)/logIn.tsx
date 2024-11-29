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
import * as AppleAuthentication from 'expo-apple-authentication'
import {useAuthService} from "@/hooks/useAuthService";
import {
    // statusCodes,
    isErrorWithCode,
    isSuccessResponse,
    isNoSavedCredentialFoundResponse, GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const authService = useAuthService();

    const handleEmailLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await authService.signIn(email, password);
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await GoogleOneTapSignIn.checkPlayServices();
            const response = await GoogleOneTapSignIn.signIn();

            if (isSuccessResponse(response)) {
                console.log(response.data);
            } else if (isNoSavedCredentialFoundResponse(response)) {
                // Android and Apple only.
                // No saved credential found (user has not signed in yet, or they revoked access)
                // call `createAccount()`
            }
        } catch (error) {
            console.error(error);
            if (isErrorWithCode(error)) {
                console.log(error)
                // switch (error.code) {
                //     case statusCodes.ONE_TAP_START_FAILED:
                //         // Android-only, you probably have hit rate limiting.
                //         // You can still call `presentExplicitSignIn` in this case.
                //         break;
                //     case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                //         // Android: play services not available or outdated.
                //         // Get more details from `error.userInfo`.
                //         // Web: when calling an unimplemented api (requestAuthorization)
                //         // or when the Google Client Library is not loaded yet.
                //         break;
                //     default:
                //     // something else happened
            }
        }
    }


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
                await authService.signInWithApple(appleCredential.identityToken);
                // Navigation will be handled by the auth state change in AuthContext
            }
        } catch (error: any) {
            if (error.code === 'ERR_CANCELED') {
                setError('Sign in was canceled');
            } else if (error.code === 'auth/invalid-credential') {
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
                        testID="email_sign_in_button"
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
                        <GoogleSigninButton onPress={handleGoogleLogin} />
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
