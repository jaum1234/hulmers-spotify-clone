import axios from "axios";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../src/api";

export const middleware = async (request: NextRequest) => {
    const response: NextResponse = NextResponse.next();

    if (request.url.includes('/login')) {
        return response;
    }
    
    if (!request.cookies.token) {
        return NextResponse.redirect('http://localhost:3000/login');
    }

    // if (tokenExpired(request.cookies.expires_in)) {

    //     await axios.post('http://localhost:3001/auth/refresh-token', {
    //         refreshToken: request.cookies.refresh_token
    //     })
    //     .then(({ data }) => {
    //         response.cookie('token', data.access_token);
    //         response.cookie('expires_in', moment().add(data.expires_in, 'seconds'));
    //     });

    // }

    return response;
}

export const tokenExpired = (tokenExpirationDate: string): boolean => {
    return moment().isSameOrAfter(JSON.parse(tokenExpirationDate));
}
