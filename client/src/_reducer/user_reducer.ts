import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from "../_action/types";
import { UserAction } from "../_action/user_action"

type UserState = {
    loginSuccess?: boolean,
    register?: any,
    userData?: any,
};

const initialState = {};

export default function (initialState={}, action: UserAction) {
    switch(action.type) {
        case LOGIN_USER:
            return {...initialState, loginSuccess: action.payload };
        case REGISTER_USER:
            return {...initialState, register: action.payload};
        case AUTH_USER:
            return {...initialState, userData: action.payload};
        default: 
            return initialState;
    }  
}