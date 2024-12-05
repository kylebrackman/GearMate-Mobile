import {useAuth} from "@/context/AuthContext";
import {AuthService} from "@/services/AuthService";

export const useAuthService = () => {
    const authService = new AuthService();
    const {user} = useAuth();

    return {
        user,
        signIn: authService.signIn.bind(authService), // Kyle this is shorthand for signIn: (username, password) => authService.signIn(username, password)
        signInWithApple: authService.signInWithApple.bind(authService),
        signInWithGoogle: authService.signInWithGoogle.bind(authService),
        signUp: authService.signUp.bind(authService),
        signOut: authService.signOut.bind(authService),
        resetPassword: authService.resetPassword.bind(authService),
    };
};
