import Cookies from "js-cookie";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api, tokenExpired } from "../api";
import { login } from "../services/store/actions/auth";

const useRefreshToken = () => {

    const { expiresIn, refreshToken } = useSelector((state: any) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (tokenExpired(expiresIn) && refreshToken) {
            const refresh = async () => {
                await api.post('/auth/refresh-token', {
                    refresh_token: refreshToken
                })
                .then(({ data }: any) => {
                    Cookies.set('token', data.access_token);
                    Cookies.set('expires_in', moment().add(data.expires_in ,'seconds'));  
                    
                    dispatch(refreshToken({accessToken: data.access_token, expiresIn: data.expires_in}))
                })
            }
            refresh();
        }
    })

}

export default useRefreshToken;