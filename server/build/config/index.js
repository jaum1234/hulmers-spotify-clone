"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server_port = exports.spotify = exports.credencials = void 0;
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
exports.credencials = {
    clientId: '410a9a2a41524717a430f0b76436429b',
    clientSecret: '8fe6357ee68942888bab5762645a453f',
    responseType: 'code',
    redirectUri: 'http://localhost:3000/login'
};
exports.spotify = new spotify_web_api_node_1.default({
    clientId: exports.credencials.clientId,
    clientSecret: exports.credencials.clientSecret,
    redirectUri: exports.credencials.redirectUri
});
exports.server_port = 3001;
