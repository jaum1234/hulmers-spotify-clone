import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import Highlights from "../../components/shared/Highlights";
import SpotifyCard from "../../components/shared/SpotifyCard";
import { useFetch } from "../../hooks/useFetch";
import { CardType } from "../../types/spotify-card";

const Profile = ({ currentUser, userPlaylists }: any): JSX.Element => {

    //const { data: currentUser } = useFetch('/users/me');
    //const { data: userPlaylists } = useFetch(`/users/${currentUser?.id}/playlists`);

    useEffect(() => {
        console.log("🚀 ~ file: index.tsx ~ line 12 ~ currentUser", currentUser)        
    })

    return(
        <SimpleGrid
            templateColumns='repeat(2, 1fr)'
            spacingX={10}
            spacingY={20}
            marginTop={50}
            columns={[1, null, 2]}
        >
            <Box
                display='flex'
                justifyContent='flex-end'
                height={250}
            >
                <Image 
                    src={ currentUser?.images[0]?.url } 
                    alt="User profile picture"
                    borderRadius={10}
                    fit='cover'
                    boxShadow='0px 0px 66px -15px rgba(0,0,0,0.75)'
                />
            </Box>
            <Box
                height={250}
                display='flex'
                flexDir='column'
                justifyContent='flex-end'
            >
                <Text>
                    User
                </Text>
                <Text
                    fontWeight='bold'
                    fontSize='5xl'
                >
                    { currentUser?.name }
                </Text>
            </Box>
            <Box
                gridColumnStart={1}
                gridColumnEnd={3}
            >
                
            </Box>
            <Box
                gridColumnStart={1}
                gridColumnEnd={3}

            >
                <Highlights
                    title="Your Playlists"
                >
                    
                    {
                        Array.isArray(userPlaylists) && userPlaylists.map((playlist: any) => (
                            <SpotifyCard
                                key={ playlist.id }
                                id={ playlist.id }
                                name={ playlist.name }
                                artist={ playlist.owner }
                                src={ playlist.images.length !== 0 ? playlist.images[0].url : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' }
                                type={ CardType.playlist }
                                uris={ playlist.uri }
                            />
                        ))
                    }
                </Highlights>
            </Box>
        </SimpleGrid>
    )
}

export default Profile;