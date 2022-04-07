import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { api } from "../api";

const useFetch = (endpoint: string) => {
    const router = useRouter();
    const [cookies] = useCookies<string>();
    const [data, setData] = useState<any[] | any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState();

    useEffect(() => {
        
        if (!router.isReady) return;

        const abortController = new AbortController()
        api.get(endpoint, {
            headers: {
                Authorization: cookies.token
            }
        })
        .then(res => {
            setData(res.data);
        }, (err: any) => {
            setError(err.response.data);
            
            if (err.response.status === 401) {
                router.push('/login');
            }
            
        })

        setLoading(false);
        return () => abortController.abort();
    }, [cookies.token, endpoint, router, cookies.expires_in])

    return { data, error, loading };
}

export const tokenExpired = (tokenExpirationDate: string): boolean => {
    return moment().isSame(tokenExpirationDate) || moment().isAfter(tokenExpirationDate)
}

export default useFetch;
