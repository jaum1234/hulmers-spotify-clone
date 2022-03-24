import express, { NextFunction } from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { server_port } from "./config";

import auth from './routes/auth';
import tracks from './routes/tracks';
import albums from './routes/albums';
import playlists from './routes/playlists';
import users from './routes/users';
import { logger } from "./utils";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/tracks', tracks);
app.use('/albums', albums);
app.use('/playlists', playlists);
app.use('/users', users);

app.use((err: any, request: any, response: any, next: any) => {
    logger.error(err);
    response.status(err.statusCode).send(err);
})

app.listen(server_port, () => console.log(`server running on port ${server_port}`));

