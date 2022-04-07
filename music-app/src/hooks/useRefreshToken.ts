import moment from "moment";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { api, tokenExpired } from "../api";

const useRefreshToken = () => {

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

export default useRefreshToken;