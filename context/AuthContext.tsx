import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {AuthContextType} from "@/types/AuthContextType";
import {UserData} from "@/types/UserData";

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

interface AuthProviderProps {
    children: ReactNode;
}

const mapFirebaseUser = (user: User): UserData => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
});

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const auth = getAuth();

    useEffect(() => {
        // Kyle this will return so we stop listening for changes.
        // When you return a function from useEffect, React calls it
        // 1. Before the component unmounts
        // 2. Before re-running the effect if we have dependencies
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(mapFirebaseUser(firebaseUser));
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{user, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
