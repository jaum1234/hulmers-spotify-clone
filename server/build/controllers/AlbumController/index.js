"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const utils_1 = require("../../utils");
exports.default = {
    getAlbums: (request, response, next) => {
        const token = String(request.get('Authorization'));
        config_1.spotify.setAccessToken(token);
        config_1.spotify.getAlbums([
            '3Zqe5icElI6gNEM9v3UpXN',
            '0qpYN6nZdr4CCp8Jj3EVPz',
            '74ENYp1WCgRwENEc3HafHu',
            '553ule760ZQM4VqcMARP5H'
        ])
            .then((res) => {
            const albumsInfo = res.body.albums.map((album) => ({
                id: album.id,
                name: album.name,
                artist: album.artists[0].name,
                album_image: album.images,
                uri: album.uri,
                tracks: album.tracks.items.map((track) => ({
                    id: track.id,
                    name: track.name,
                    uri: track.uri,
                }))
            }));
            response.json(albumsInfo);
        })
            .catch((err) => {
            next(err);
        });
    },
    getAlbum: (request, response, next) => {
        const token = String(request.get('Authorization'));
        config_1.spotify.setAccessToken(token);
        const { id } = request.params;
        config_1.spotify.getAlbum(id)
            .then((res) => {
            const albumInfo = {
                id: res.body.id,
                name: res.body.name,
                artist: res.body.artists[0].name,
                images: res.body.images,
                tracks: res.body.tracks.items.map((track) => ({
                    id: track.id,
                    name: track.name,
                    uri: track.uri,
                    duration: track.duration_ms
                }))
            };
            utils_1.logger.info(res);
            response.json(albumInfo);
        })
            .catch((err) => {
            next(err);
        });
    },
};
