import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from "./types";

type BodyData = {
    email: string,
    name?: string,
    password: string
}

export function loginUser(dataToSubmit : BodyData) {

    const request = axios.post('/api/users/login', dataToSubmit).then((res)=> res.data );

    return {
        type: LOGIN_USER,
        payload: request
    }
};


export function registerUser(dataToSubmit: BodyData) {

    const request = axios.post('/api/users/register', dataToSubmit).then((res)=> res.data );

    return {
        type: REGISTER_USER,
        payload: request
    }
};


export function auth() {

    const request = axios.get('/api/users/auth').then((res)=> res.data );

    return {
        type: AUTH_USER,
        payload: request
    }
};

export type UserAction =
  | ReturnType<typeof loginUser>
  | ReturnType<typeof registerUser>
  | ReturnType<typeof auth>