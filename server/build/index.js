"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config");
const auth_1 = __importDefault(require("./routes/auth"));
const tracks_1 = __importDefault(require("./routes/tracks"));
const albums_1 = __importDefault(require("./routes/albums"));
const playlists_1 = __importDefault(require("./routes/playlists"));
const users_1 = __importDefault(require("./routes/users"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/auth', auth_1.default);
app.use('/tracks', tracks_1.default);
app.use('/albums', albums_1.default);
app.use('/playlists', playlists_1.default);
app.use('/users', users_1.default);
app.use((err, request, response, next) => {
    utils_1.logger.error(err);
    response.status(err.statusCode).send(err);
});
app.listen(config_1.server_port, () => console.log(`server running on port ${config_1.server_port}`));
