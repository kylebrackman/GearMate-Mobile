import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    User, OAuthProvider, signInWithCredential
} from 'firebase/auth';

export class AuthService {
    private auth = getAuth();

    async signIn(email: string, password: string): Promise<User> {
        try {
            const {user} = await signInWithEmailAndPassword(this.auth, email, password);
            return user;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async signInWithApple(identityToken: string): Promise<User> {
        try {
            const provider = new OAuthProvider('apple.com');
            const credential = provider.credential({
                idToken: identityToken,
            });
            const {user} = await signInWithCredential(this.auth, credential);
            return user;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async signUp(email: string, password: string): Promise<User> {
        try {
            const {user} = await createUserWithEmailAndPassword(this.auth, email, password);
            return user;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async signOut(): Promise<void> {
        try {
            await this.auth.signOut();
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async resetPassword(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(this.auth, email);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: unknown): Error {
        if (error instanceof Error) {
            return error;
        }
        return new Error('An unknown error occurred');
    }
}
