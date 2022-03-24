import { NextFunction, Request, Response } from 'express';
import { spotify } from '../../config';
import { logger } from '../../utils';

export default {
    getAuthUser: (request: Request, response: Response, next: NextFunction) => {
        const token: string = String(request.get('Authorization'));
        spotify.setAccessToken(token);
    
        spotify.getMe()
        .then((res: {body: any}) => {
            const authUser = {
                id: res.body.id,
                name: res.body.display_name,
                images: res.body.images
            }
            
            response.json(authUser);
        })
        .catch((err: any) => {
            next(err);
        })
    },
    
    getUserPlaylists: (request: Request, response: Response, next: NextFunction) => {
        const token: string = String(request.get('Authorization'));
        spotify.setAccessToken(token);
    
        const { id } = request.params;
    
        spotify.getUserPlaylists(id)
        .then((res: {body: {items: Array<object>}}) =>  {
            const playlistInfo = res.body.items.map((playlist: any) => (
                {
                    id: playlist.id,
                    name: playlist.name,
                    owner: playlist.owner.display_name,
                    images: playlist.images,
                    uri: playlist.uri
                }
            ))
            
            response.json(playlistInfo);
        })
        // .then(async (playlistInfo: any) => {
        //     const tracks = await spotify.getPlaylistTracks(playlistInfo.id);
        //     logger.info(tracks);
        // })
        .catch((err: any) => {
            next(err);
        });
    },


    createPlaylist: (request: Request, response: Response, next: NextFunction) => {
        const token: string = String(request.get('Authorization'));
        spotify.setAccessToken(token);

        const { name, isPublic }: { name: string, isPublic: boolean } = request.body;

        spotify.createPlaylist(name, { 'description': '', 'public': isPublic })
        .then(() => {
            response.status(201).end();
        }, (err: any) => {
            next(err);
        });
    }
}