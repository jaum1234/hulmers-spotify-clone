import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 
    'http://localhost:3001' 
    : 
    'https://server-hulmers.herokuapp.com'

export const api = axios.create({
    baseURL: baseUrl
})

export const fetchData = async (endpoint: string, options: {}) => {
    const data =  await fetch(`${baseUrl + endpoint}`, options)
        .then(res => res.json());

    return data;
}






