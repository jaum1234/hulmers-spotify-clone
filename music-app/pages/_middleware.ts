import { NextRequest, NextResponse } from "next/server";

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

