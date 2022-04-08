import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useCookies } from "react-cookie";
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
    const [cookies, setCookies] = useCookies();

    useEffect(() => {
        if (!authData) return;

        const { token, user } = authData;
        
        //these are meant for the server-side
        Cookies.set('token', token.accessToken);
        Cookies.set('refresh_token', token.accessToken);
        Cookies.set('expires_in', token.accessToken);

        dispatch(login(token, user));

        router.push('/');
        
    }, [authData, setCookies, router, dispatch]);

}

export default useAuth;

