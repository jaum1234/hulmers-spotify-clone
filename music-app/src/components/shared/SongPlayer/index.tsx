import React, { useContext, useEffect, useState } from "react";
import { SongPlayer } from "../../../types/song-player";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { saveVolume } from "../../../services/store/actions/songPlayer";
import { PlayBackContext } from "../../../contexts/PlayBackContext";

const SongPlayer = React.memo(function SongPlayer() {

    const [play, setPlay] = useState<boolean>(false);
    const playBackContext = useContext(PlayBackContext)
    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.auth.token.accessToken);
    const volume = useSelector((state: any) => state.songPlayer.volume);
    
    useEffect(() => {
        setPlay(true)
    }, [playBackContext?.playingTrack])

    if (!token) return null;

    return(
        <Box
            position='fixed'
            bottom={0}
            width='100%'
        >
            <SpotifyWebPlayer
                token={ token }
                showSaveIcon
                callback={state => {
                    if (!state.isPlaying) {
                        setPlay(false);
                    }
                    dispatch(saveVolume(state.volume));
                }}
                initialVolume={ volume ? parseFloat(volume) : 1 }
                autoPlay={true}
                play={play}
                uris={ playBackContext?.playingTrack ? playBackContext?.playingTrack : [] }
                
            />
        </Box>
    )
})

export default SongPlayer;