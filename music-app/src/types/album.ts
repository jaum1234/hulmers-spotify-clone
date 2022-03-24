export type Album = {
    id: string, 
    name: string, 
    artist: {
        id: string,
        name: string
    }, 
    album_image: Array<{url: string}>
    tracks: any,
    uri: string
}

export type AlbumInfo = {
   
    body: {
        name: string, 
        images: [{url: string}], 
        artists: [{name: string}], 
        tracks: {
            items: [{artists: [{}]}]
        }
    }
    
}