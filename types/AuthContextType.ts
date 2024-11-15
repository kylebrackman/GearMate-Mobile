import {UserData} from "@/types/UserData";

export interface AuthContextType {
    user: UserData | null;
    loading: boolean;
}
