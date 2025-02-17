import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Auth } from "firebase/auth";
import { User } from "firebase/auth";

export const loginUserApi = async (auth: Auth, email: string, password: string) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const logoutUserApi = async (auth: Auth) => {
    try {
        const response = await signOut(auth);
        console.log(response);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

// Todo: review User naming convention with firebase auth user vs gearmate user
export async function getUserApi(): Promise<User | null> {
    const response = await fetch('/api/me');
    if (!response.ok) {
        return null;
    }
    const user = (await response.json()) as User;
    return user;
}