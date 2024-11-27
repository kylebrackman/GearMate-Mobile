import { render, fireEvent, waitFor } from '@testing-library/react-native';
import {useAuthService} from "@/hooks/useAuthService";
import LoginScreen from "@/app/(auth)/logIn";

jest.mock('@/hooks/useAuthService');
jest.mock('expo-apple-authentication');
jest.mock('expo-status-bar', () => ({
    StatusBar: () => null
}));
describe('LoginScreen', () => {
    const mockSignIn = jest.fn();
    const mockSignInWithApple = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useAuthService as jest.Mock).mockReturnValue({
            signIn: mockSignIn,
            signInWithApple: mockSignInWithApple
        });
    });

    describe('Email Login', () => {
        it('shows error when email or password is empty', async () => {
            const { getByText, getByPlaceholderText } = render(<LoginScreen />);

            const signInButton = getByText('Sign In');
            fireEvent.press(signInButton);

            const errorText = getByText('Please fill in all fields');
            expect(errorText).toBeTruthy();
        });

        // it('calls signIn with correct credentials', async () => {
        //     const { getByPlaceholderText, getByText } = render(<LoginScreen />);
        //
        //     const emailInput = getByPlaceholderText('Email');
        //     const passwordInput = getByPlaceholderText('Password');
        //     const signInButton = getByText('Sign In');
        //
        //     fireEvent.changeText(emailInput, 'test@example.com');
        //     fireEvent.changeText(passwordInput, 'password123');
        //     fireEvent.press(signInButton);
        //
        //     await waitFor(() => {
        //         expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
        //     });
        // });
        //
        // it('shows error message on login failure', async () => {
        //     // Mock signIn to throw an error
        //     mockSignIn.mockRejectedValue(new Error('Login failed'));
        //
        //     const { getByPlaceholderText, getByText } = render(<LoginScreen />);
        //
        //     const emailInput = getByPlaceholderText('Email');
        //     const passwordInput = getByPlaceholderText('Password');
        //     const signInButton = getByText('Sign In');
        //
        //     fireEvent.changeText(emailInput, 'test@example.com');
        //     fireEvent.changeText(passwordInput, 'password123');
        //     fireEvent.press(signInButton);
        //
        //     await waitFor(() => {
        //         const errorText = getByText('Failed to sign in. Please check your credentials.');
        //         expect(errorText).toBeTruthy();
        //     });
        // });
    });

});
