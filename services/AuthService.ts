import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    User, OAuthProvider, signInWithCredential, UserCredential
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

    private async signInWithCredentials(provider: OAuthProvider, identityToken: string): Promise<UserCredential> {
        try {
            console.log("Over in this")
            const credential = provider.credential({idToken: identityToken});
            return await signInWithCredential(this.auth, credential);
        } catch (error) {
            console.log("Or error", error)
            throw this.handleError(error);
        }
    }

    async signInWithApple(identityToken: string): Promise<User> {
        console.log("Hey")
        const provider = new OAuthProvider('apple.com');
        provider.setCustomParameters({
            aud: 'com.gearmate.dev'
        });
        console.log("Hey 2")
        const {user} = await this.signInWithCredentials(provider, identityToken);
        console.log("Hey 3")
        return user;
    }

    async signInWithGoogle(identityToken: string): Promise<User> {
        console.log("Hey")
        const provider = new OAuthProvider('google.com');
        console.log("Next")
        const {user} = await this.signInWithCredentials(provider, identityToken);
        console.log("Made it")
        return user;
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
