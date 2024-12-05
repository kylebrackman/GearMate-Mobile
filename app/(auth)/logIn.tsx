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
    Modal
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import SignUpScreen from "@/app/(auth)/signup";
import {
    AppleAuthenticationButton,
    AppleAuthenticationButtonStyle,
    AppleAuthenticationButtonType
} from 'expo-apple-authentication';
import * as AppleAuthentication from 'expo-apple-authentication'
import {useAuthService} from "@/hooks/useAuthService";
import {colors} from "@/theme/styles";
import {
    GoogleSignin, isErrorWithCode, GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';


GoogleSignin.configure(
    {
        webClientId:"246799732026-0op12133h0v0r37bjctcldo9cl708t87.apps.googleusercontent.com",
        iosClientId: "246799732026-9gv6dilt9tm1k8if24sjq33ci3p06t76.apps.googleusercontent.com"
    }
);

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const authService = useAuthService();
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

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

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
            const googleCredential = await GoogleSignin.signIn();
            if (googleCredential.data?.idToken) {
                await authService.signInWithGoogle(googleCredential.data?.idToken);
                // Navigation will be handled by the auth state change in AuthContext
            }
        } catch (error) {
            console.log("Error details:", JSON.stringify(error));

            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        // operation (eg. sign in) already in progress
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // Android only, play services not available or outdated
                        break;
                    default:
                    // some other error happened
                }
            } else {
                // an error that's not related to google sign in occurred
            }
        }
    };

    const handleAppleLogin = async () => {
        try {
            setIsLoading(true);
            setError('');

            const nonce = Math.random().toString(36).substring(2, 10);

            const appleCredential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
                nonce: nonce
            });

            if (appleCredential.identityToken) {
                await authService.signInWithApple(appleCredential.identityToken);
                // Navigation will be handled by the auth state change in AuthContext
            }
        } catch (error: any) {
            console.log(error)
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
                    <Text style={styles.title}>Log In</Text>

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
                        style={styles.authButton}
                        onPress={handleEmailLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#ffffff"/>
                        ) : (
                            <Text style={styles.buttonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>
                    <View>
                        <Text> Don't have an account? </Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal visible={isModalVisible} animationType="slide">
                        <SignUpScreen toggleModal={toggleModal}/>
                    </Modal>
                    <View style={styles.divider}>
                        <View style={styles.dividerLine}/>
                        <Text style={styles.dividerText}>or continue with</Text>
                        <View style={styles.dividerLine}/>
                    </View>

                    <View>
                        {Platform.OS === 'ios' && (
                            <AppleAuthenticationButton
                                onPress={handleAppleLogin}
                                buttonType={AppleAuthenticationButtonType.SIGN_IN}
                                buttonStyle={AppleAuthenticationButtonStyle.BLACK}
                                style={{width: 300, height: 50}}
                                cornerRadius={10}
                            />
                        )}
                        <GoogleSigninButton onPress={handleGoogleSignIn} />
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
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
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

});

export default LoginScreen;
