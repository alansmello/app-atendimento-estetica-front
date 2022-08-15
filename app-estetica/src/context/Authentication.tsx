import React, { createContext, useState } from "react";
import { api } from "../services/clinicaestetica";
import jwt_decode from 'jwt-decode';

interface AuthenticationContext {
  
    token: string,
    addToken: (token: string) => void;
}


export const AuthenticationContext = createContext<AuthenticationContext>({

    token:"",
    addToken: (token: "") => { },
});

export const AuthenticationProvider = ({ children }) => {
    const [token, setToken] = useState<string>("");

    function addToken(token: string) {
        setToken(token);
    };


    return (
        <AuthenticationContext.Provider value={{
        
            token,
            addToken,
            
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}