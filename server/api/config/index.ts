import SpotifyWebApi from 'spotify-web-api-node';

export const credencials: {
    clientId: string,
    clientSecret: string,
    responseType: string,
    redirectUri: string
} = {
    clientId: '410a9a2a41524717a430f0b76436429b',
    clientSecret: '8fe6357ee68942888bab5762645a453f',
    responseType: 'code',
    redirectUri: 'http://localhost:3000/login'
}

export const spotify: any = new SpotifyWebApi({
    clientId: credencials.clientId,
    clientSecret: credencials.clientSecret,
    redirectUri: credencials.redirectUri
});

export const server_port: string | number = process.env.PORT || 3001;

