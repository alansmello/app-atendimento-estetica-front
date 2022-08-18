import axios from "axios";

export const api = axios.create ({
    //baseURL: 'http://192.168.1.2:8080/',
    baseURL: 'http://192.168.1.16:8080/',
});
