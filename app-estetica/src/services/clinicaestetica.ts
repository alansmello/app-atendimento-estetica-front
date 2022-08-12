import axios from "axios";

export const api = axios.create ({
    baseURL: 'http://localhost:8080/',
});


//     const url = `patient/getAllPatient`,{
//         headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYXNzYSIsImV4cCI6MTY2MDM1MDY3MH0.iP7zE9GW2lrEwiPwjcAjDov5JjNnozUL6K9piz12-HUk0JVqWPRPx9cb6zKvuihwPDDGYdSPpJwP9bs87A57ZQ"}
//     };
//     return instance.get(url);
// }