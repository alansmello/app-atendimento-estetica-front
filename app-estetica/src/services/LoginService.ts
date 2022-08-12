import React from "react";
import { api } from "./clinicaestetica";
import jwt_decode from 'jwt-decode';

const LoginService = async (username: string, senha: string) => {

    console.log("username :", username, "Senha", senha, "To dentro do API Response");
    var tokenDecodificado = null;
    var password = senha;
    try {
        const resposta = await api.post("login", {
            username,
            password
        });
        if (resposta.status === 200) {
            console.log('Resposta do LoginService' + JSON.stringify(resposta.data));
            tokenDecodificado = jwt_decode(resposta.data.token);
            tokenDecodificado['token'] = resposta.data.token;
           
            return tokenDecodificado;
        } else {
            return false;
        }
    }
    catch (error) {
        console.log('Erro ao realizar login' + JSON.stringify(error));

    }

}
export { LoginService };