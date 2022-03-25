import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SongPlayer } from "../../../types/song-player";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";

const SongPlayer = ({ trackUri }: SongPlayer) => {

    const [play, setPlay] = useState<boolean>(false);
    const [cookies, setCookies] = useCookies<string>();

    
    useEffect(() => {
        setPlay(true)
    }, [trackUri])

    if (!cookies.token) return null;

    return(
        <SpotifyWebPlayer
            token={ cookies.token }
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) {
                    setPlay(false);
                }
                setCookies('init_vol', state.volume);
            }}
            initialVolume={ cookies.init_vol ? parseFloat(cookies.init_vol) : 1 }
            autoPlay={true}
            play={play}
            uris={ trackUri ? trackUri : [] }
            
        />
    )
}

export default SongPlayer;