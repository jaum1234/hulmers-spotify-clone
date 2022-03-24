import Track from "./Track";
import { Box, SimpleGrid, Table } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TrackList } from '../../types/tracks';

const TracksList = ({ tracks, artist }: { tracks: TrackList, artist: string}) => {

    const router = useRouter();

    return(
        <SimpleGrid>
            <SimpleGrid
                templateColumns='5% 50% 20% 10% 5%'
                fontWeight='bold'
                marginBottom={5}
            >
                <Box>#</Box>
                <Box>Title</Box>
                <Box>
                {
                    !router.pathname.includes('/albums') && 'Album'
                }
                </Box>
                <Box>Duration</Box>
                <Box></Box>
            </SimpleGrid>
            
            {
                Array.isArray(tracks) ? tracks.map((track: any, index: number) => (
                    <Track 
                        key={ track.id } 
                        track={ track } 
                        index={ index } 
                        artist={ artist }
                    />
                ))  
                :
                null
            }
        </SimpleGrid>
    )
}



export default TracksList;