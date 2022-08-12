import React, { createContext, useState } from "react";
import { LoginService } from "../services/LoginService";

export const AuthenticationContext = createContext({});

export const AuthenticationProvider = ({ children }) => {
    const [usuario, setUsuario] = useState<Object>({
        username:'',
        token: ''
    });


    const login = async (email, senha) => {

        const answerServiceLogin = await LoginService(email, senha);
        if (!answerServiceLogin) {
            return false;
        } else {
            setUsuario({
                username: answerServiceLogin?.username,
                token: answerServiceLogin?.token,
                
            });
            return true;
        }
    };

    return (
        <AuthenticationContext.Provider value={{
            login,
            usuario
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}