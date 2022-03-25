import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    // const response: NextResponse = NextResponse.next();

    // if (request.url.includes('/login')) {
    //     return response;
    // }
    
    // if (!request.cookies.token) {
    //     if (process.env.NODE_ENV === 'development') {
    //         return NextResponse.redirect('http://localhost:3000/login');
    //     }
    //     return NextResponse.redirect('https://hulmers-spotify-clone.vercel.app/login');
    // }

    // return response;
}

