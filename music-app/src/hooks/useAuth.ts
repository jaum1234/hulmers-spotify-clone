import moment from "moment";
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { api } from "../api";

export const useAuth = (authData: any) => {

    const router = useRouter();
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        if (authData) {
            setCookie('token', authData.token.accessToken);
            setCookie('refresh_token', authData.token.refreshToken);
            setCookie('expires_in', authData.token.expiresIn);
            setCookie('user', authData.user);

            router.push('/');
        }
    }, [authData, setCookie, router]);

}