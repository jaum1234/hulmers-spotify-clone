import moment from "moment";
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { api, tokenExpired } from "../api";

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
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        if (authData) {
            setCookie('token', authData.token.accessToken);
            setCookie('refresh_token', authData.token.refreshToken);
            setCookie('expires_in', moment().add(authData.token.expiresIn, 'seconds'));
            setCookie('user', authData.user);

            router.push('/');
        }
    }, [authData, setCookie, router]);
}

export const useRefreshToken = () => {

    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        if (tokenExpired(cookies.expires_in) && cookies.refresh_token) {
            const refresh = async () => {
                await api.post('/auth/refresh-token', {
                    refresh_token: cookies.refresh_token
                })
                .then(({ data }: any) => {
                    setCookie('token', data.access_token);
                    setCookie('expires_in', moment().add(data.expires_in ,'seconds'));                    
                })
            }
            refresh();
        }
    })

}