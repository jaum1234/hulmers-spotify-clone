import TracksList from "../TracksList";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

/**
 *  Colletions relate to either Albums or Playlists and
 *  it's their responsability to display all de info about
 *  those two.
 */

type CollectionProps = {
    name: string,
    owner: string,
    tracks: any,
    imageSrc: string
}

const Collection = ({ name, owner, tracks, imageSrc }: CollectionProps) => {
    return(
        <>
            <Box 
                paddingTop={25} 
                paddingBottom={25}
            >
                <Flex
                    flexDir='column'
                    alignItems='center'
                    paddingBottom={10}
                >
                    <Image
                        width={200} 
                        height={200}
                        fit='cover' 
                        src={ imageSrc } 
                        alt="album image"
                        borderRadius={5}
                        marginBottom={5}
                    />
                    <Text
                        fontWeight='bold'
                        fontSize='5xl'
                        textTransform='uppercase'
                    >
                        { name }
                    </Text>
                    <Text>{ owner }</Text>
                </Flex>
                <TracksList tracks={ tracks } artist={ owner }/>
            </Box>
        </>
    )
}

export default Collection;