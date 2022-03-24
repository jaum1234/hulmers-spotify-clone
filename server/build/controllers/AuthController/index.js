"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = {
    getAuthorizationFromUser: (request, response) => {
        const queryParameters = `client_id=${config_1.credencials.clientId}&response_type=${config_1.credencials.responseType}&redirect_uri=${config_1.credencials.redirectUri}`;
        response
            .redirect(`https://accounts.spotify.com/authorize?${queryParameters}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-modify-public%20playlist-read-private`);
    },
    getToken: (request, response, next) => {
        const { code } = request.body;
        config_1.spotify.authorizationCodeGrant(code)
            .then((data) => {
            config_1.spotify.setAccessToken(data.body.access_token);
            return {
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            };
        })
            .then((data) => __awaiter(void 0, void 0, void 0, function* () {
            const authUser = yield config_1.spotify.getMe().then((res) => res);
            return { user: authUser.body.id, token: data };
        }))
            .then((data) => {
            response.json(data);
        })
            .catch((err) => {
            next(err);
        });
    },
    getRefreshToken: (request, response, next) => {
        const { refresh_token: refreshToken } = request.body;
        const parsedRefreshToken = JSON.parse(refreshToken);
        config_1.spotify.setRefreshToken(parsedRefreshToken);
        config_1.spotify.refreshAccessToken()
            .then((res) => {
            response.json(res.body);
        })
            .catch((err) => {
            next(err);
        });
    }
};
