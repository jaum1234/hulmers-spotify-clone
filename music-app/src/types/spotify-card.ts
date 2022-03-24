export type SpotifyCard = {
    id: string,
    name: string,
    artist: {id: string, name: string},
    albumUri?: string,
    type: CardType,
    src?: string,
    uris: string | Array<string>
}

export enum CardType {
    album = 'albums',
    playlist = 'playlists'
}