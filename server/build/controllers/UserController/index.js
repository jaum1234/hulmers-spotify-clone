"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = {
    getAuthUser: (request, response, next) => {
        const token = String(request.get('Authorization'));
        config_1.spotify.setAccessToken(token);
        config_1.spotify.getMe()
            .then((res) => {
            const authUser = {
                id: res.body.id,
                name: res.body.display_name,
                images: res.body.images
            };
            response.json(authUser);
        })
            .catch((err) => {
            next(err);
        });
    },
    getUserPlaylists: (request, response, next) => {
        const token = String(request.get('Authorization'));
        config_1.spotify.setAccessToken(token);
        const { id } = request.params;
        config_1.spotify.getUserPlaylists(id)
            .then((res) => {
            const playlistInfo = res.body.items.map((playlist) => ({
                id: playlist.id,
                name: playlist.name,
                owner: playlist.owner.display_name,
                images: playlist.images,
                uri: playlist.uri
            }));
            response.json(playlistInfo);
        })
            // .then(async (playlistInfo: any) => {
            //     const tracks = await spotify.getPlaylistTracks(playlistInfo.id);
            //     logger.info(tracks);
            // })
            .catch((err) => {
            next(err);
        });
    },
    createPlaylist: (request, response, next) => {
        const token = String(request.get('Authorization'));
        config_1.spotify.setAccessToken(token);
        const { name, isPublic } = request.body;
        config_1.spotify.createPlaylist(name, { 'description': '', 'public': isPublic })
            .then(() => {
            response.status(201).end();
        }, (err) => {
            next(err);
        });
    }
};
