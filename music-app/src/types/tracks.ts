export type TrackList = {
    tracks?: Array<object>
} 

export type Track = {
    id: string,
    album: {
        id: string,
        artist: {
            id: string,
            name: string
        },
        name: string,
        images: {
            url: string
        }[],
        uri: string
    },
    
    name: string,
    duration?: number,
    uri: string, 
};