import React, { createContext, useState } from "react";
import { api } from "../services/clinicaestetica";
import jwt_decode from 'jwt-decode';

interface AuthenticationContext {
  
    usuario: String,
    addToken: (token: String) => void;
}


export const AuthenticationContext = createContext<AuthenticationContext>({

    usuario:"",
    addToken: (token: "") => { },
});

export const AuthenticationProvider = ({ children }) => {
    const [usuario, setUsuario] = useState<String>("");

    function addToken(token: String) {
        setUsuario(token);
    };


    return (
        <AuthenticationContext.Provider value={{
        
            usuario,
            addToken,
            
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}