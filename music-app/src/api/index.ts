import axios from 'axios';
import moment from 'moment';

const baseUrl = process.env.NODE_ENV === 'development' ? 
    'http://localhost:3001' 
    : 
    'https://server-hulmers.herokuapp.com'

export const tokenExpired = (expirationDate: string): boolean => {
    if (!expirationDate) {
        return false;
    }

    return moment().isSameOrAfter(expirationDate);
}

/*
    For client-side
 */
export const api = axios.create({
    baseURL: baseUrl
})

/*
    For server-side
 */
type Headers =  {
    [x: string]: string
}

export const fetchData = async (endpoint: string, token: string, headers?: Headers) => {
    
    const data =  await fetch(`${baseUrl + endpoint}`, {
        headers: {
            Authorization: token,
            ...headers
        }
    })
    .then(res => res.json());

    return data
}










