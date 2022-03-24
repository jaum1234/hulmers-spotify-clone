import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { AiFillPlayCircle } from 'react-icons/ai';
import { PlayBackContext } from "../../contexts/PlayBackContext";
import { SpotifyCard } from "../../types/spotify-card";

/**
 *  Generally, SpotifyCards are used to display albums or playlists. Therefore,
 *  at least the ID prop must always be related to one of these two.
 */

const SpotifyCard = ({ id, name, artist, type, src, uris }: SpotifyCard): JSX.Element => {
    
    const [playButton, setPlayButton] = useState<boolean>(false);
    const playBackContext = useContext(PlayBackContext);
    const router = useRouter();
    //const { data: tracks } = useFetch(`/${type}/${id}/tracks`);
    
    const handlePlay = (event: any) => {
        event.stopPropagation();
        playBackContext?.chooseTrack(uris);
    }

    return(
        <Flex
            flexDir='column'
            boxShadow='0px 0px 27px -12px black'
            background='#fff'
            width='220px'
            color="#000"
            height='300'
            padding={3}
            boxSizing='border-box'
            marginRight={7}
            marginBottom={10}
            _hover={{ boxShadow: '0px 0px 40px -12px black' }}
            borderRadius={5}
            cursor='pointer'
            onMouseEnter={ () => setPlayButton(true) }
            onMouseLeave={ () => setPlayButton(false) }
            position="relative"
            transition="0.2s ease-in-out"
            onClick={ () => {
                router.push({pathname: `/${type}`, query: {id}} )
            }}
        >
            <Box>
                <Image 
                    width='100%'
                    height={200}
                    fit='cover'
                    src={ src }
                    borderRadius={5} 
                    marginBottom={3}
                    alt="image album"
                />
            </Box>
            <Box>
                <Text
                    fontWeight='bold'
                    fontSize="17px"
                >
                    { name.length >= 22 ? `${name.substring(0, 22)}...` : name }
                </Text>
                <Text>{ artist }</Text>
            </Box>
            {
                playButton &&

                    <Box
                        position='absolute'
                        top="55%"
                        color="#F55246"
                        transition='0.2s ease-in-out'
                        _hover={{ color: "#F3281A" }}
                    >
                        <Fade direction="down" duration={500}>
                            <AiFillPlayCircle
                                fontSize={50}   
                                onClick={ handlePlay }
                            />
                        </Fade>
                    </Box>
            }
        </Flex>
    )
}

export default SpotifyCard;