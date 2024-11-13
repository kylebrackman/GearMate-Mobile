import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
//   import { getUserApi } from '../services/apis/UserApi';
//   import { User } from '../types/models.types';
import { onAuthStateChanged, User } from "firebase/auth";
import firebase from "firebase/compat";
import auth = firebase.auth;

interface UserProviderProps {
  children: ReactNode;
}
interface UserContextType {
  user: User | null;
  loginContext: (user: User | null) => void;
}
const defaultContextValue: UserContextType = {
  user: null,
  loginContext: () => { }
};


export const UserContext = createContext<UserContextType>(defaultContextValue);

// Custom hook for consuming the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const user = await getUserApi();
//       if (user) {
//         setUser(user);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   void fetchUser();
// }, []);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);


  // onAuthStateChanged(auth, (user) => {
  //   console.log("this is the user FROM CONTEXT", user);
  //   setUser(user);
  // })


  const loginContext = (user: User | null) => {
    if (user) {
      setUser(user);
    }
  };



  return (
    <UserContext.Provider value={{ user, loginContext }}>
      {children}
    </UserContext.Provider>
  );
};
