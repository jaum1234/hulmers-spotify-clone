import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { login } from "../services/store/actions/auth";

type AuthData = {
    token: {
        accessToken: string,
        refreshToken: string,
        expiresIn: string
    },
    user: string
}

export const useAuth = (authData: AuthData) => {

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!authData) return;

        const { token, user } = authData;
        
        //these are meant for the server-side
        Cookies.set('token', token.accessToken);
        Cookies.set('refresh_token', token.accessToken);
        Cookies.set('expires_in', moment().add(token.accessToken, 'seconds'));

        dispatch(login(token, user));

        router.push('/');
        
    }, [authData, router, dispatch]);

}

export default useAuth;

