import { NextFunction, Request, Response } from 'express';
import { spotify } from '../../config';
import { logger } from '../../utils';

export default {
    getRecommendations: (request: Request, response: Response, next: NextFunction) => {
        const token = String(request.get('Authorization'));
        spotify.setAccessToken(token);
       
        spotify.getRecommendations({
            limit: 4,
            min_energy: 0.4,
            seed_artists: ['6ft7JnxMyZhp7N52qzHymY', '64sY7LsUjNE3ifONkftTXC'],
            min_popularity: 50
        })
        .then((res: {body: {tracks: Array<object>}}) => {
            const tracksInfo = res.body.tracks.map((track: any) => (
                {
                    id: track.id,
                    name: track.name,
                    uri: track.uri,
                    album: {
                        id: track.album.id,
                        name: track.album.name,
                        images: track.album.images,
                        artist: track.album.artists[0].name,
                        uri: track.album.uri
                    }
                }
            ))

            response.json(tracksInfo);
        })
        .catch((err: any) => {
            next(err);
        })
    },

    search: (request: Request, response: Response, next: NextFunction) => {
        const token: string = String(request.get('Authorization'));
        spotify.setAccessToken(token);
    
        const searchFilter: string = String(request.query.q);
    
        spotify.searchTracks(searchFilter)
            .then((res: any) => {
                const search = res.body.tracks?.items.map((result: any) => (
                    {
                        id: result.id,
                        name: result.name,
                        uri: result.uri,
                        duration: result.duration_ms,
                        artist: result.artists[0].name,
                        album: {
                            id: result.album.id,
                            name: result.album.name,
                            images: result.album.images,
                            uri: result.album.uri,
                        }
                    }
                ));
                response.json(search);
            })
            .catch((err: any) => {
                next(err);
            })
    }
}