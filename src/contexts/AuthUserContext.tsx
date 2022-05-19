import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "../config/firebase";
interface AuthUserContextType {
  userCredential: User | null | undefined;
}

export const AuthUserContext = createContext<AuthUserContextType>({
  userCredential: undefined,
});

export const useAuthUserContext = () => {
  useContext(AuthUserContext);
};

const AuthUserContextProvider: React.FC = (props: any) => {
  const [userCredential, setUserCredential] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    auth.onAuthStateChanged(setUserCredential);
  }, []);
  return (
    <AuthUserContext.Provider value={{ userCredential: userCredential }}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
