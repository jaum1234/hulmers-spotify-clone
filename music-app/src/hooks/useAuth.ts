import moment from "moment";
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { api } from "../api";

export const useAuth = (code: string | string[] | undefined) => {

    const router = useRouter();
    const [cookies, setCookies] = useCookies();

    useEffect(() => {
        if (!router.isReady) return;
        if (!code) return

        const abortController = new AbortController();

        const token = () => {
            api.post('/auth/token', {
                code
            })
            .then((res: any) => {
                setCookies('user', res.data.user);
                setCookies('refresh_token', res.data.token.refreshToken)
                setCookies('expires_in', moment().add(res.data.token.expiresIn, 'seconds'));
                setCookies('token', res.data.token.accessToken);
                router.push('/');
            })
            .catch(() => {
                router.push('/login');
            });
        }

        token();

        return () => abortController.abort();
       
    }, [code, router, setCookies, cookies.token]);

}