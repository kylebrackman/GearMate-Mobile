import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import {Auth} from "firebase/auth";
import {User} from "firebase/auth";
import {GearMateUser} from "@/types/models.types";
import {API_BASE_URL} from "@/src/config/api.config";
import firebase from "firebase/compat";
import {Item} from "@/types/models.types";

// Todo: Review login and logout functions below and see if they are redundant based on firebase auth
export const loginUserApi = async (auth: Auth, email: string, password: string) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log("response here", response);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Todo: review User naming convention with firebase auth user vs gearmate user
export const getUserApi = async (uid: string | undefined): Promise<GearMateUser | null> => {
    const response = await fetch(`${API_BASE_URL}/api/get_user_by_firebase_id/${uid}`);
    if (!response.ok) {
        return null;
    }
    const user = (await response.json()) as GearMateUser;
    return user
};

export const getUserOwnedItemsApi = async (uid: string | undefined): Promise<Item[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/user_owned_items/${uid}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const ownedItems: Item[] = await response.json();

        return ownedItems
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
};

