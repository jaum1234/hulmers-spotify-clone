import { NextFunction, Request, Response } from 'express';
import { spotify } from '../../config';
import { logger } from '../../utils';

export default {
    getPlaylist: (request: Request, response: Response, next: NextFunction) => {
        const token = String(request.get('Authorization'));
        spotify.setAccessToken(token);
    
        const { id } = request.params;
    
        spotify.getPlaylist(id)
            .then((res: any) => {
                const playlistInfo = {
                    name: res.body.name,
                    images: res.body.images,
                    owner: res.body.owner.display_name,
                    tracks: res.body.tracks.items.map((track: any) => (
                        {
                            id: track.track.id,
                            name: track.track.name,
                            uri: track.track.uri,
                            duration: track.track.duration_ms,
                            album: {
                                id: track.track.album.id,
                                name: track.track.album.name,
                                uri: track.track.album.uri,
                                images: track.track.album.images,
                                artist: track.track.album.artists[0].name,
                            }
                        }
                    ))
                }
                response.json(playlistInfo);
            })
            .catch((err: any) => {
                next(err);
            })
    },
    addTrack: (request: Request, response: Response, next: NextFunction) => {
        const token: string = String(request.get('Authorization'));
        spotify.setAccessToken(token);

        const { id, trackId } = request.params;

        spotify.addTracksToPlaylist(id, [trackId])
        .then((res: any) => {
            response.status(201).end();
        }, (err: any) => {
            next(err)
        });
    },
    removeTrack: (request: Request, response: Response, next: NextFunction) => {
        const token: string = String(request.get('Authorization'));
        spotify.setAccessToken(token);

        const { id: playlistId, trackId } = request.params;

        spotify.removeTracksFromPlaylist(playlistId, [{ uri: trackId }])
        .then((data: any) => {
            response.end()
        }, (err: any) => {
            next(err);
        });
    }
}