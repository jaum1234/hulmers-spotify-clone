import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://server-hulmers.herokuapp.com'
})






