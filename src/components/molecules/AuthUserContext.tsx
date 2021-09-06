import React, { createContext, useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth } from "../atoms/firebase";

/*export interface AuthUserContextType {
    userCredential?: firebase.auth.UserCredential;
    setUserCredential: (credential: firebase.auth.UserCredential) => void;
}*/

/*const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);*/

interface AuthUserContextType {
    userCredential: firebase.User | null | undefined;
}

/*const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);*/
export const AuthUserContext = createContext<AuthUserContextType>({ userCredential: undefined });

export const useAuthUserContext = () => {
    useContext(AuthUserContext);
    /*const  userAuth = useContext(AuthUserContext);
    console.log(userAuth?.userCredential);
    if (!userAuth) {
        throw new Error();
    }
    return userAuth;*/
};

const AuthUserContextProvider: React.FC = (props: any) => {
    /*const [userCredential, setUserCredential] = useState<firebase.auth.UserCredential>();*/
    const [ userCredential, setUserCredential ] = useState<firebase.User | null | undefined>(undefined);

    //ユーザーログイン処理
    /*const login = async (props: LoginType) => {
        try {
            await auth.signInWithEmailAndPassword(props.email, props.password);
            props.history.push("/admin");
        } catch (error) {
            alert(error);
        }
    };*/

    useEffect(() => {
        auth.onAuthStateChanged(setUserCredential);
        }, []);

    /*return (
        <AuthUserContext.Provider value={{userCredential, setUserCredential}}>
            {children}
        </AuthUserContext.Provider>
    )*/
    return (
        <AuthUserContext.Provider value={{ userCredential: userCredential}}>
            {props.children}
        </AuthUserContext.Provider>
    );
};

export default AuthUserContextProvider;