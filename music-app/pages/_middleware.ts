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

    return response;
}

export const tokenExpired = (tokenExpirationDate: string): boolean => {
    return moment().isSameOrAfter(JSON.parse(tokenExpirationDate));
}
