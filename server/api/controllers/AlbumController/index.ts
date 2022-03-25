import { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';
import { spotify } from '../../config';
import { logger } from '../../utils';

export default {
    getAlbums: (request: Request, response: Response, next: NextFunction) => {
        const token: string = String(request.get('Authorization'));
        spotify.setAccessToken(token);

        spotify.getAlbums([
            '3Zqe5icElI6gNEM9v3UpXN', 
            '0qpYN6nZdr4CCp8Jj3EVPz', 
            '74ENYp1WCgRwENEc3HafHu', 
            '553ule760ZQM4VqcMARP5H'
        ])
        .then((res: any) => {
            const albumsInfo = res.body.albums.map((album: {
                id: string,
                name: string,
                uri: string,
                artists: Array<{name: string}>,
                images: Array<{}>,
                tracks: {
                    items: Array<{id: string, name: string, uri: string}>
                }
            }) => (
                {
                    id: album.id,
                    name: album.name,
                    artist: album.artists[0].name,
                    album_image: album.images,
                    uri: album.uri,
                    tracks: album.tracks.items.map((track: {id: string, name: string, uri: string}) => (
                        {
                            id: track.id,
                            name: track.name,
                            uri: track.uri,
                            
                        }
                    ))
                }
            ));

            response.json(albumsInfo);
        })
        .catch((err: any) => {
            next(err);
        })
    },
    getAlbum: (request: Request, response: Response, next: NextFunction) => {
        const token = String(request.get('Authorization'));
        spotify.setAccessToken(token);
    
        const { id } = request.params;
    
        spotify.getAlbum(id)
            .then((res: any) => {
                const albumInfo = {
                    id: res.body.id,
                    name: res.body.name,
                    artist: res.body.artists[0].name,
                    images: res.body.images,
                    tracks: res.body.tracks.items.map((track:any) => (
                        {
                            id: track.id,
                            name: track.name,
                            uri: track.uri,
                            duration: track.duration_ms
                        }
                    ))
                }
                response.json(albumInfo);
            })
            .catch((err: any) => {
                next(err);
            })
    },
}