import * as AppleAuthentication from 'expo-apple-authentication';
import { signInWithCredential, OAuthProvider } from 'firebase/auth';
import {auth} from '@/src/config/firebaseConfig'

export default async function signInWithApple() {
    try {
        const appleCredential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ]
        });

        if (appleCredential.identityToken) {
            const provider = new OAuthProvider('apple.com');
            const credential = provider.credential({
                idToken: appleCredential.identityToken,
            });

            const userCredential = await signInWithCredential(auth, credential);
            return userCredential.user;
        }
    } catch (error: any) {
        if (error.code === 'ERR_CANCELED') {
            console.log('User canceled Apple Sign In');
            return null;
        }
        console.error('Apple Sign In Error:', error);
        throw error;
    }
};
