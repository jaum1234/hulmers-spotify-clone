import moment from "moment"
import Cookie from 'js-cookie';

const INITAL_STATE: AuthState = {
    token: {
        accessToken: "",
        refreshToken: "",
        expiresIn: "",
    },
    user: ""
}

export interface AuthState {
    token: {
        accessToken: string,
        refreshToken: string,
        expiresIn: string,
    },
    user: string
}

export interface Token {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
}

export interface Action {
    type: string,
    token: {
        accessToken: string,
        refreshToken: string,
        expiresIn: string
    },
    user: string
}

const auth = (state = INITAL_STATE, action: Action) => {
    switch (action.type) {
        case 'LOG_IN': 
            return {
                token: { ...action.token, expiresIn: moment().add(action.token.expiresIn, 'seconds') },
                user: action.user
            }

        case 'LOG_OUT':
            return {
                token: {
                    accessToken: "",
                    refreshToken: "",
                    expiresIn: "",
                }
            }
        default:
            return state;
    }
}

export default auth;