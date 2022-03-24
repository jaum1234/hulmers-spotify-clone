"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = {
    getPlaylist: (request, response, next) => {
        const token = String(request.get('Authorization'));
        config_1.spotify.setAccessToken(token);
        const { id } = request.params;
        config_1.spotify.getPlaylist(id)
            .then((res) => {
            const playlistInfo = {
                name: res.body.name,
                images: res.body.images,
                owner: res.body.owner.display_name,
                tracks: res.body.tracks.items.map((track) => ({
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
                }))
            };
            response.json(playlistInfo);
        })
            .catch((err) => {
            next(err);
        });
    },
    addTrack: (request, response, next) => {
        const token = String(request.get('Authorization'));
        config_1.spotify.setAccessToken(token);
        const { id, trackId } = request.params;
        config_1.spotify.addTracksToPlaylist(id, [trackId])
            .then((res) => {
            response.status(201).end();
        }, (err) => {
            next(err);
        });
    },
    removeTrack: (request, response, next) => {
        const token = String(request.get('Authorization'));
        config_1.spotify.setAccessToken(token);
        const { id: playlistId, trackId } = request.params;
        config_1.spotify.removeTracksFromPlaylist(playlistId, [{ uri: trackId }])
            .then((data) => {
            response.end();
        }, (err) => {
            next(err);
        });
    }
};
