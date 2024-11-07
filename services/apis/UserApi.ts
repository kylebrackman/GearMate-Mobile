import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/src/config/firebaseConfig";
import { Auth } from "firebase/auth";


const auth = FIREBASE_AUTH
export const loginUserApi = async (auth: Auth, email: string, password: string) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
    } catch (error: any) {
        throw new Error(error.message);
    }
};