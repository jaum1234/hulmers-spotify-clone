import { Box, Flex, Image, List, ListItem, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { api } from "../../../../api";
import { PlayBackContext } from "../../../../contexts/PlayBackContext";
import { useFetch } from "../../../../hooks/useFetch";
import { Track } from "../../../../types/tracks";
import { getDurationInMinutes, getDurationInSeconds } from "../../../../utils/track-duration";


const Track = ({ track, index, artist }: { track: Track, index: number, artist: string }): JSX.Element => {

    const router = useRouter();
    const playBackContext = useContext(PlayBackContext);
    const [dropDown, setDropDown] = useState<boolean>(false);
    const [cookie] = useCookies();

    const { 
        data: userPlaylists 
    }: { 
        data: Array<{id: string, name: string}> 
    } = useFetch(`/users/${cookie.user}/playlists`);
    

    const trackBelongsToUserPlaylist = () => {
        const filter = userPlaylists?.filter(playlist => playlist.id === router.query.id);
        return filter?.length;
    }

    return(
        <SimpleGrid
            templateColumns='5% 50% 20% 10% 5%'
            boxShadow='0px 0px 20px -12px black'
            borderRadius={5}
            marginBottom={3}
            alignItems='center'
            padding={2}
            transition='0.2s ease-in-out'
            _hover={{ color: "#fff", background: "gray" }}
            cursor='pointer'
            onClick={() => {
                playBackContext?.chooseTrack(track.uri);
            }}
        >   
            <Box>
                { index + 1 }
            </Box>
            <Box
                display='flex'
                alignItems='center'
                borderRadius={5}

            >
                {
                    !router.pathname.includes('/albums') &&
                        <Image
                            alt="album image"
                            src={ track?.album?.images[2]?.url }
                            marginRight={3}
                            width={10}
                            height={10}
                            objectFit='cover'
                        />
                }
                <Flex
                    flexDir='column'
                >
                    <Text
                        fontWeight='bold'
                    >
                        { track?.name.length > 30 ? `${track.name.substring(0, 30)}...` : track.name }
                    </Text>
                    <Text>
                        { artist?.length > 15 ? artist.substring(0, 15) : artist }
                    </Text>
                </Flex>
            </Box>
            <Box>
            {
                !router.pathname.includes('/albums') &&
                        <Text
                            fontSize={14}
                            _hover={{ textDecoration: 'underline' }}
                            onClick={(event) => {
                                event.stopPropagation();
                                router.push({
                                    pathname: '/albums',
                                    query: {
                                        id: track?.album?.id
                                    }
                                })
                            }}
                        >
                            { track?.album?.name.length > 15 ? `${track?.album?.name.substring(0, 15)}...` : track?.album?.name }
                        </Text>
            }
            </Box>
            <Box>
                {  getDurationInMinutes(track?.duration)  }
                :
                { String(getDurationInSeconds(track?.duration)).padStart(2, '0') }
            </Box>
            {

            }
            <Box>
                <Text
                    textAlign='center'
                    width={5}
                    borderRadius={10}
                    _hover={{ background: 'red' }}
                    transition='0.2s ease-in-out'
                    onClick={(event) => {
                        event.stopPropagation();

                        if (trackBelongsToUserPlaylist()) {
                            api.delete(`/playlists/${router.query.id}/tracks/${track.uri}`, {
                                headers: {
                                    Authorization: cookie.token
                                }
                            });

                            router.reload();
                            return;
                        }
                        
                        setDropDown((prev) => !prev);
                    }}
                >
                    {
                        router.pathname.includes('/playlists') ? 
                        '-'
                        :
                        '+'
                    }
                </Text>
                {
                    dropDown &&
                        <Box
                            position='absolute'
                            bg='#fff'
                            color='black'
                            padding={1}
                            fontSize={13}
                            borderRadius={5}
                            boxShadow='-1px 0px 15px 1px rgba(0,0,0,0.1)'
                        >
                            <List>
                                {
                                    userPlaylists?.map((playlist: {id: string, name: string}) => (
                                        <ListItem
                                            key={ playlist.id }
                                            paddingX={3}
                                            paddingY={2}
                                            borderRadius={2}
                                            _hover={{ bg: '#e1e3e6' }}
                                            onClick={ (event) => {
                                                event.stopPropagation();
                                                api.post(
                                                    `/playlists/${playlist.id}/tracks/${track.uri}`,
                                                    {},
                                                    {
                                                        headers: {
                                                            Authorization: cookie.token
                                                        }
                                                    }  );
                                            }}
                                        >
                                            { playlist.name }
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Box>
                }
            </Box>
        </SimpleGrid>
    )
}

export default Track;