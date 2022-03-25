import { Response, Request, NextFunction } from 'express';
import { credencials, spotify } from '../../config';
import { logger } from '../../utils';

export default {
    getAuthorizationFromUser: (request: Request, response: Response) => {
        const queryParameters: string = `client_id=${credencials.clientId}&response_type=${credencials.responseType}&redirect_uri=${credencials.redirectUri}`
        
        response
            .redirect(`https://accounts.spotify.com/authorize?${queryParameters}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-modify-public%20playlist-read-private`);
    },

    getToken: (request: Request, response: Response, next: NextFunction) => {
        const { code }: { code: string } = request.body;

        spotify.authorizationCodeGrant(code)
            .then((data: {
                body: {
                    access_token: string, 
                    refresh_token: string, 
                    expires_in: number
                }
            }) => {
                spotify.setAccessToken(data.body.access_token);
                return {
                    accessToken: data.body.access_token,
                    refreshToken: data.body.refresh_token,
                    expiresIn: data.body.expires_in,
                };
            })
            .then(async (data: object) => {
                const authUser = await spotify.getMe().then((res: any) => res);
            
                return {user: authUser.body.id, token: data};
            })
            .then((data: any) => {
                response.json(data);
            })
            .catch((err: any) => {
                next(err);
            })
    },
    
    getRefreshToken: (request: Request, response: Response, next: NextFunction) => {
        const { refresh_token: refreshToken }: { refresh_token: string } = request.body;

        const parsedRefreshToken = JSON.parse(refreshToken);
       
        spotify.setRefreshToken(parsedRefreshToken);
    
        spotify.refreshAccessToken()
            .then((res: {body: object}) => {
                response.json(res.body);
            })
            .catch((err: any) => {
                next(err);
            })
    }
}