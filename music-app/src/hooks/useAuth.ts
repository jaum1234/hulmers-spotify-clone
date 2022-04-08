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

    useEffect(() => {
        if (!authData) return;

        const { token, user } = authData;
        dispatch(login(token, user));
        router.push('/login');
        
    }, [authData, router, dispatch]);

}

export default useAuth;

