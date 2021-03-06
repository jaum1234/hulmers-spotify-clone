import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api";

const useFetch = (endpoint: string) => {
    const router = useRouter();
    const { accessToken } = useSelector((state: any) => state.auth.token);
    const [data, setData] = useState<any[] | any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState();

    useEffect(() => {
        
        if (!router.isReady) return;

        const abortController = new AbortController()
        api.get(endpoint, {
            headers: {
                Authorization: accessToken
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
    }, [endpoint, accessToken, router])

    return { data, error, loading };
}

export const tokenExpired = (tokenExpirationDate: string): boolean => {
    return moment().isSame(tokenExpirationDate) || moment().isAfter(tokenExpirationDate)
}

export default useFetch;
