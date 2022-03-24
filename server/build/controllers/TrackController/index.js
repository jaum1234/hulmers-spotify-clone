"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = {
    getRecommendations: (request, response, next) => {
        const token = String(request.get('Authorization'));
        config_1.spotify.setAccessToken(token);
        config_1.spotify.getRecommendations({
            limit: 4,
            min_energy: 0.4,
            seed_artists: ['6ft7JnxMyZhp7N52qzHymY', '64sY7LsUjNE3ifONkftTXC'],
            min_popularity: 50
        })
            .then((res) => {
            const tracksInfo = res.body.tracks.map((track) => ({
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
            }));
            response.json(tracksInfo);
        })
            .catch((err) => {
            next(err);
        });
    },
    search: (request, response, next) => {
        const token = String(request.get('Authorization'));
        config_1.spotify.setAccessToken(token);
        const searchFilter = String(request.query.q);
        config_1.spotify.searchTracks(searchFilter)
            .then((res) => {
            var _a;
            const search = (_a = res.body.tracks) === null || _a === void 0 ? void 0 : _a.items.map((result) => ({
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
            }));
            response.json(search);
        })
            .catch((err) => {
            next(err);
        });
    }
};
